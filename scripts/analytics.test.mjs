import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installAnalytics, contactChannel, CONSENT_KEY } from '../src/lib/analytics.js';

function fixture(hostname = 'edicionaular.com', saved = null) {
  const element = () => ({ hidden: false, listeners: {}, addEventListener(name, fn) { this.listeners[name] = fn; }, focus() {}, click() { this.listeners.click?.(); } });
  const accept = element(), reject = element(), preferences = element(), panel = element();
  panel.querySelector = selector => selector === '[data-analytics-accept]' ? accept : reject;
  const storage = new Map(saved ? [[CONSENT_KEY, JSON.stringify(saved)]] : []);
  const scripts = [], deletedCookies = [], listeners = {};
  let reloads = 0;
  const win = { location: { hostname, origin: `https://${hostname}`, pathname: '/soluciones-ia/', reload() { reloads++; } },
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) } };
  const doc = { head: { appendChild(script) { scripts.push(script); } }, createElement: () => ({}),
    querySelector: selector => selector === '#analytics-consent' ? panel : preferences,
    addEventListener(name, fn) { listeners[name] = fn; },
    get cookie() { return '_ga=test; _ga_2CTQCP83WM=test; theme=dark'; }, set cookie(value) { deletedCookies.push(value); } };
  installAnalytics(win, doc);
  return { win, doc, scripts, panel, accept, reject, preferences, storage, deletedCookies, reloads: () => reloads,
    openPreferences() { listeners.click({ target: { closest: selector => selector === '[data-analytics-preferences]' ? preferences : null } }); },
    clickGuideButton() { listeners.click({ target: { closest(selector) { return selector === 'button[data-contact-channel="whatsapp"]' ? { closest: () => null, getAttribute() { throw new Error('El resumen no debe leerse para medir el clic'); } } : null; } } }); },
    click(href) { listeners.click({ target: { closest(selector) { return selector === 'a[href]' ? { getAttribute: () => href, closest: () => null } : null; } } }); } };
}

test('No carga Google ni registra contactos antes de elegir o después de rechazar', () => {
  const f = fixture();
  assert.equal(f.panel.hidden, false);
  f.click('https://wa.me/573002730128');
  f.reject.click();
  f.click('https://cal.com/edicion-aular-website');
  assert.equal(f.scripts.length, 0);
  assert.equal(f.win.dataLayer.length, 0);
  assert.equal(JSON.parse(f.storage.get(CONSENT_KEY)).value, 'denied');
});

test('Aceptación y reinicialización cargan el contenedor una sola vez', () => {
  const f = fixture();
  f.accept.click();
  f.accept.click();
  installAnalytics(f.win, f.doc);
  assert.equal(f.scripts.length, 1);
  assert.match(f.scripts[0].src, /gtm\.js\?id=GTM-TKRFCRBN$/);
  assert.equal(f.win.dataLayer.filter(e => e.event === 'gtm.js').length, 1);
});

test('La preferencia tiene vigencia y los previews y localhost no envían datos', () => {
  for (const host of ['localhost', 'deploy-preview-2--edicionaular.netlify.app']) {
    const f = fixture(host, { value: 'granted', date: Date.now() });
    f.accept.click();
    f.click('https://wa.me/573002730128');
    assert.equal(f.scripts.length, 0);
    assert.equal(f.win.dataLayer.length, 0);
  }
  assert.equal(fixture('edicionaular.com', { value: 'granted', date: Date.now() - 181 * 86400000 }).scripts.length, 0);
  assert.equal(fixture('edicionaular.com', { value: 'granted', date: Date.now() }).scripts.length, 1);
});

test('Los contactos envían una acción por clic sin copiar destino, correo, teléfono o mensaje', () => {
  const f = fixture();
  f.accept.click();
  for (const href of ['https://wa.me/573002730128?text=mensaje_privado', 'https://cal.com/edicion-aular-website?email=persona@example.com', 'tel:+573002730128', 'mailto:persona@example.com']) f.click(href);
  const events = f.win.dataLayer.filter(e => e.event?.startsWith('cta_'));
  assert.deepEqual(events.map(e => e.event), ['cta_whatsapp_click', 'cta_agenda_click', 'cta_phone_click', 'cta_email_click']);
  assert.doesNotMatch(JSON.stringify(events), /mensaje_privado|persona@|573002730128|https:|\?/);
  f.click('https://wa.me.ejemplo.com/');
  f.click('/blog/');
  assert.equal(f.win.dataLayer.filter(e => e.event?.startsWith('cta_')).length, 4);
});

test('Retirar la aceptación detiene eventos, borra cookies GA y reinicia sin el contenedor', () => {
  const f = fixture();
  f.accept.click();
  f.reject.click();
  f.click('https://wa.me/573002730128');
  assert.equal(f.reloads(), 1);
  assert.equal(f.win['ga-disable-G-2CTQCP83WM'], true);
  assert.equal(f.win.dataLayer.filter(e => e.event?.startsWith('cta_')).length, 0);
  assert.equal(f.deletedCookies.length, 6);
  assert.ok(f.deletedCookies.every(c => !c.startsWith('theme=')));
});

test('El clasificador rechaza protocolos ejecutables y agendas de otras cuentas', () => {
  for (const href of ['javascript:alert(1)', 'https://cal.com/otra-cuenta', 'https://cal.com/edicion-aular-website-falso']) assert.equal(contactChannel(href, 'https://edicionaular.com'), null);
});

test('Las preferencias reabren el aviso tras una elección guardada y permiten retirarla', () => {
  const f = fixture('edicionaular.com', { value: 'granted', date: Date.now() });
  assert.equal(f.panel.hidden, true);
  f.openPreferences();
  assert.equal(f.panel.hidden, false);
  f.reject.click();
  assert.equal(JSON.parse(f.storage.get(CONSENT_KEY)).value, 'denied');
  assert.equal(f.reloads(), 1);
});
test('el botón del orientador mide solo el canal con consentimiento y no lee las respuestas',()=>{
  const f=fixture();f.clickGuideButton();assert.equal(f.win.dataLayer.length,0);
  f.accept.click();f.clickGuideButton();
  assert.deepEqual(f.win.dataLayer.filter(e=>e.event?.startsWith('cta_')),[{event:'cta_whatsapp_click',page_path:'/soluciones-ia/',link_channel:'whatsapp',cta_location:'content'}]);
  f.reject.click();f.clickGuideButton();assert.equal(f.win.dataLayer.filter(e=>e.event?.startsWith('cta_')).length,1);
});
