# Analítica y favicon · 30 de octubre de 2026

## Recursos de Google

- Cuenta de Tag Manager: Edición Aular (6401298423).
- Contenedor web: edicionaular.com, `GTM-TKRFCRBN` (284455289).
- Versión publicada: 2, «GA4 y acciones de contacto con consentimiento».
- Propiedad existente de Analytics: Edicion Aular (473734888).
- Flujo web: 10165055148; medición `G-2CTQCP83WM`. Se conserva su historial.
- Search Console: propiedad URL `https://edicionaular.com/` vinculada a ese flujo con autorización del titular.

## Instalación y elección del visitante

`src/components/Analytics.astro` y `src/lib/analytics.js` sustituyen la instalación directa anterior de gtag.js. El contenedor solo se descarga en `edicionaular.com` y `www.edicionaular.com`, después de aceptar la analítica. Localhost y las vistas previas no envían mediciones.

La preferencia se guarda durante 180 días en localStorage. «Preferencias de cookies», en el pie, permite cambiarla. Retirar una aceptación desactiva GA4, elimina las cookies `_ga` accesibles para estos dominios y recarga sin GTM. No se añade iframe noscript porque evitaría esta elección. Este mecanismo es carga previa aceptación; no se presenta como implementación de Consent Mode v2 ni como certificación jurídica.

## Configuración del contenedor

- `GA4 - Edición Aular`: etiqueta nativa Google Analytics, medición existente, Initialization - All Pages.
- `GA4 - Acciones de contacto`: etiqueta nativa de eventos GA4, nombre `{{Event}}`.
- Activador «Contacto - Eventos permitidos»: evento personalizado con expresión regular `^cta_(whatsapp|agenda|phone|email)_click$`.
- Parámetros: `page_path` = `{{Page Path}}`; `link_channel` = `{{DLV - link_channel}}`; `cta_location` = `{{DLV - cta_location}}`. Las dos variables son de capa de datos, versión 2.
- Detección y funciones de datos proporcionados por usuarios: desactivadas. Clics salientes, interacciones de formulario y vistas por cambios de historial: desactivados. Se mantienen desplazamientos, vídeos y descargas.
- El código desactiva señales de Google y personalización publicitaria. No se instalaron etiquetas de publicidad.

Los eventos representan clics de intención de contacto, no conversaciones enviadas, reservas confirmadas ni ventas. Sus parámetros propios no contienen URL de destino, números, correos, mensajes o datos de formularios. GA4 también procesa sus datos técnicos habituales después de aceptar la medición.

`cta_whatsapp_click` y `cta_agenda_click` se registraron como eventos clave, una vez por sesión y sin valor monetario predeterminado. No se crearon reglas que dupliquen eventos de página.

## Iconos

La fuente es el símbolo de marca existente `public/img/favicon.svg`. `npm run iconos` regenera SVG raíz, PNG de 96 px, ICO con tamaños 16/32/48, Apple de 180 px, PWA de 192/512 y una variante maskable con margen seguro. Se reemplazó el antiguo PNG de Bringer, el SVG de Astro y las referencias del manifest a archivos ausentes.

El layout usa las nuevas URL raíz para evitar reutilizar la antigua URL PNG con caché de un año. La versión del service worker aumenta a v1.0.1. Google necesita volver a rastrear la página y el icono; el cambio de código no actualiza inmediatamente Search Console ni los resultados.

## Comprobaciones

- `node --test scripts/analytics.test.mjs`: 7 pruebas de carga única, consentimiento, preferencias, retirada, entornos, canales y parámetros.
- `npm run build`: 63 páginas.
- `npm run audit:geo`: 21 páginas, 236 bloques JSON-LD, sin errores.
- Revisión visual del aviso y botones en modo claro y oscuro.
- Producción: favicon PNG responde 200 con la marca y caché de un día. Antes de aceptar no hay scripts de Tag Manager; después aparece el contenedor correcto. Analytics en tiempo real recibió `page_view`, `cta_agenda_click` y `cta_whatsapp_click` durante la validación. Esos clics de prueba forman parte de la medición de ese día.
- Chrome en producción: aceptar, reabrir preferencias desde el pie y rechazar funcionan. Después de la retirada y recarga se comprobaron cero scripts de Google Tag Manager. El control usa delegación en captura para no depender de manejadores del tema.

La guía PDF sobre Claude y Stape se consultó como referencia. No se instaló un MCP de terceros ni se concedieron permisos adicionales a Stape o Claude. La configuración se realizó directamente en Google, sin contratar servicios.
