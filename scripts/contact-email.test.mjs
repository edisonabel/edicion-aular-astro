import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../netlify/functions/consulta.mjs';
import { PROJECT_PATHS } from '../src/lib/project-guide.js';

const env = { RESEND_API_KEY: 'test-secret', CONTACT_EMAIL_FROM: 'Edición Aular <info@edicionaular.com>', CONTACT_EMAIL_TO: 'edicionaular@gmail.com' };
const valid = { goal: PROJECT_PATHS[0].id, current: PROJECT_PATHS[0].choices[0], context: 'Una consulta de prueba.', name: 'Prueba', email: 'persona@example.com', consent: true, website: '', requestId: '12345678-1234-1234-1234-123456789012' };
const request = (data = valid, origin = 'https://edicionaular.com') => new Request('https://edicionaular.com/api/consulta', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

test('No envía con origen ajeno, datos inválidos, spam o sin autorización', async () => {
  let calls = 0;
  const handler = createHandler({ env, send: async () => { calls++; throw new Error('No debe llamar'); } });
  assert.equal((await handler(request(valid, 'https://otro.example'))).status, 403);
  for (const change of [{ consent: false }, { website: 'spam' }, { email: 'a@b.com\r\nBcc: c@d.com' }, { current: 'inventada' }, { context: 'x'.repeat(361) }, { requestId: 'sin-id' }]) assert.equal((await handler(request({ ...valid, ...change }))).status, 400);
  assert.equal((await handler(request({ ...valid, context: 'x'.repeat(5000) }))).status, 413);
  assert.equal(calls, 0);
});
test('Solo ofrece el canal configurado en producción; no simula éxito si falta la clave', async () => {
  const handler = createHandler({ env: {} });
  assert.deepEqual(await (await handler(new Request('https://edicionaular.com/api/consulta'))).json(), { available: false });
  assert.equal((await handler(request())).status, 503);
  assert.equal((await handler(new Request('https://preview.example/api/consulta'))).status, 403);
  assert.equal((await handler(new Request('https://edicionaular.com/.netlify/functions/consulta'))).status, 404);
});
test('Regenera el resumen, fija el destinatario y no refleja secretos en la respuesta', async () => {
  let sent;
  const handler = createHandler({ env, send: async (url, options) => { sent = { url, ...options }; return Response.json({ id: 'provider-id' }); } });
  const response = await handler(request({ ...valid, to: 'intruso@example.com', summary: 'falso', html: '<script>falso</script>' }));
  assert.equal(response.status, 202);
  const payload = JSON.parse(sent.body);
  assert.deepEqual(payload.to, ['edicionaular@gmail.com']);
  assert.equal(payload.from, env.CONTACT_EMAIL_FROM);
  assert.equal(payload.reply_to, valid.email);
  assert.match(payload.text, /Atender consultas/);
  assert.doesNotMatch(sent.body, /intruso|falso|script/);
  assert.deepEqual(await response.json(), { accepted: true });
  assert.match(sent.headers['Idempotency-Key'], /^consulta-/);
});
test('Un reintento conserva idempotencia; cambiar el contenido usa otra clave', async () => {
  const keys = [];
  const handler = createHandler({ env, send: async (_, options) => { keys.push(options.headers['Idempotency-Key']); return Response.json({ id: 'provider-id' }); } });
  await handler(request()); await handler(request()); await handler(request({ ...valid, context: 'Otra consulta' }));
  assert.equal(keys[0], keys[1]); assert.notEqual(keys[0], keys[2]);
});
test('Errores, respuestas incompletas y tiempo de espera no cuentan como envío', async () => {
  for (const send of [async () => Response.json({ error: 'detalle privado' }, { status: 429 }), async () => Response.json({}), async () => { throw new Error('test-secret'); }]) {
    const response = await createHandler({ env, send })(request());
    assert.equal(response.status, 502); assert.doesNotMatch(JSON.stringify(await response.json()), /test-secret|detalle privado|accepted/);
  }
});
