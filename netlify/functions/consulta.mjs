import { createHash } from 'node:crypto';
import { recommendProject } from '../../src/lib/project-guide.js';

const origins = new Set(['https://edicionaular.com', 'https://www.edicionaular.com']);
const reply = (status, body) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
const clean = value => typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim() : '';

// Dependencias inyectables para comprobar fallos sin enviar correos ni usar una clave real.
export function createHandler({ env = process.env, send = fetch } = {}) {
  return async request => {
    if (new URL(request.url).pathname !== '/api/consulta') return reply(404, { error: 'Ruta no disponible.' });
    const configured = Boolean(env.RESEND_API_KEY && env.CONTACT_EMAIL_FROM && env.CONTACT_EMAIL_TO);
    if (!origins.has(new URL(request.url).origin)) return reply(403, { error: 'El envío está disponible en edicionaular.com.' });
    if (request.method === 'GET') return reply(200, { available: configured });
    if (request.method !== 'POST') return reply(405, { error: 'Método no permitido.' });
    if (!origins.has(request.headers.get('origin')) || request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, { error: 'Solicitud no permitida.' });
    if (!configured) return reply(503, { error: 'El correo no está disponible ahora. Puedes continuar por WhatsApp.' });
    if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, { error: 'Formato no permitido.' });
    // Limitar también cuerpos sin Content-Length antes de analizarlos.
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: 'Faltan los datos de tu consulta.' });
    const chunks = []; let length = 0;
    for (;;) {
      const { value, done } = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > 4096) { await reader.cancel(); return reply(413, { error: 'La consulta es demasiado larga.' }); }
      chunks.push(value);
    }
    let data, recommendation;
    try { data = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return reply(400, { error: 'Revisa los datos de tu consulta.' }); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, { error: 'Revisa los datos de tu consulta.' });
    const email = clean(data.email), name = clean(data.name);
    if (data.website || data.consent !== true || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(data.email) || name.length > 80 || typeof data.context !== 'string' || data.context.length > 360 || !/^[a-f0-9-]{36}$/i.test(data.requestId || '')) return reply(400, { error: 'Revisa tu correo, las respuestas y la autorización.' });
    try { recommendation = recommendProject(data); } catch { return reply(400, { error: 'Vuelve a revisar las respuestas del orientador.' }); }
    // Destinatario y remitente solo de configuración privada; nunca del navegador.
    const payload = {
      from: env.CONTACT_EMAIL_FROM, to: [env.CONTACT_EMAIL_TO], reply_to: email,
      subject: 'Nueva consulta web · Edición Aular',
      text: `${name ? `Nombre: ${name}\n` : ''}Correo de respuesta: ${email}\n\n${recommendation.summary}\n\nAutorizó el uso de estos datos para responder su consulta.\nOrigen: orientador de edicionaular.com`,
    };
    const hash = createHash('sha256').update(JSON.stringify(payload)).digest('hex');
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST', signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `consulta-${data.requestId}-${hash}` },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || typeof result?.id !== 'string' || !result.id) return reply(502, { error: 'No pudimos confirmar el envío. Reintenta o continúa por WhatsApp.' });
      return reply(202, { accepted: true });
    } catch { return reply(502, { error: 'No pudimos confirmar el envío. Reintenta o continúa por WhatsApp.' }); }
  };
}
export default createHandler();
export const config = { path: '/api/consulta', rateLimit: { windowLimit: 3, windowSize: 60, aggregateBy: ['ip', 'domain'] } };
