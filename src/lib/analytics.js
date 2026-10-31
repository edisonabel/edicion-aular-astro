export const GTM_ID = 'GTM-TKRFCRBN';
export const GA_ID = 'G-2CTQCP83WM';
export const CONSENT_KEY = 'edicion-aular.analytics.v1';

export function contactChannel(href, origin) {
  try {
    const url = new URL(href, origin);
    if (url.protocol === 'tel:') return 'phone';
    if (url.protocol === 'mailto:') return 'email';
    if (!['https:', 'http:'].includes(url.protocol)) return null;
    if (['wa.me', 'wa.link', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) return 'whatsapp';
    if (['cal.com', 'www.cal.com'].includes(url.hostname) && /^\/edicion-aular-website(?:\/|$)/.test(url.pathname)) return 'agenda';
  } catch { /* Ignorar enlaces que no sean URL válidas. */ }
  return null;
}

export function installAnalytics(win, doc) {
  if (win.__edicionAnalyticsInstalled) return;
  win.__edicionAnalyticsInstalled = true;
  const panel = doc.querySelector('#analytics-consent');
  const preferences = doc.querySelector('[data-analytics-preferences]');
  if (!panel || !preferences) return;
  const production = ['edicionaular.com', 'www.edicionaular.com'].includes(win.location.hostname);
  let choice = null;
  let loaded = false;
  try {
    const saved = JSON.parse(win.localStorage.getItem(CONSENT_KEY) || 'null');
    if (saved && Date.now() - saved.date < 180 * 86400000 && ['granted', 'denied'].includes(saved.value)) choice = saved.value;
  } catch { /* Sin almacenamiento, respetar la elección durante esta página. */ }
  win.dataLayer = win.dataLayer || [];

  function loadContainer() {
    if (!production || loaded || choice !== 'granted') return;
    loaded = true;
    // Configuración global, sin instalar otra instancia de gtag.js ni enviar una segunda page_view.
    function settings() { win.dataLayer.push(arguments); }
    settings('set', { allow_google_signals: false, allow_ad_personalization_signals: false });
    win.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = doc.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    doc.head.appendChild(script);
  }

  function setChoice(value) {
    const withdrawing = loaded && value === 'denied';
    choice = value;
    try { win.localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, date: Date.now() })); } catch { /* Preferencia en memoria. */ }
    panel.hidden = true;
    if (value === 'granted') loadContainer();
    if (withdrawing) {
      win[`ga-disable-${GA_ID}`] = true;
      // Retirar las cookies de esta medición y reiniciar sin cargar el contenedor.
      for (const cookie of doc.cookie.split(';')) {
        const name = cookie.trim().split('=')[0];
        if (name !== '_ga' && !name.startsWith('_ga_')) continue;
        for (const domain of ['', win.location.hostname, '.edicionaular.com']) {
          doc.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ''} SameSite=Lax; Secure`;
        }
      }
      win.location.reload();
    }
  }

  panel.querySelector('[data-analytics-accept]').addEventListener('click', () => setChoice('granted'));
  panel.querySelector('[data-analytics-reject]').addEventListener('click', () => setChoice('denied'));
  preferences.hidden = false;
  panel.hidden = choice !== null;
  loadContainer();

  doc.addEventListener('click', event => {
    // Delegar en captura evita depender del estado de los controles del tema.
    if (event.target?.closest?.('[data-analytics-preferences]')) {
      panel.hidden = false;
      panel.querySelector('[data-analytics-accept]').focus();
      return;
    }
    if (!production || choice !== 'granted') return;
    const directButton = event.target?.closest?.('button[data-contact-channel="whatsapp"]');
    const link = directButton || event.target?.closest?.('a[href]');
    if (!link) return;
    const channel = directButton ? 'whatsapp' : contactChannel(link.getAttribute('href'), win.location.origin);
    if (!channel) return;
    const area = link.closest('#bringer-header') ? 'header' : link.closest('#bringer-footer') ? 'footer' : link.closest('.whatsapp-float') ? 'floating' : 'content';
    win.dataLayer.push({
      event: `cta_${channel}_click`,
      page_path: win.location.pathname,
      link_channel: channel,
      cta_location: area,
    });
  }, true);
}
