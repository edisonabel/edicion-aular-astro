# Radar editorial de IA — Edición Aular

## Estado actual: Google Apps Script

El radar se migró el 30 de octubre de 2026 a un proyecto privado de Google Apps Script, autorizado en la cuenta edicionaular@gmail.com. Ya no necesita el computador encendido ni la aplicación de Codex abierta. La automatización local `radar-editorial-de-ia-edici-n-aular` queda pausada como reserva para evitar correos duplicados.

- Lunes y jueves, entre las 09:00 y las 10:00, America/Bogota. Apps Script no garantiza el minuto exacto.
- Destinatario fijo: edicionaular@gmail.com. Un solo correo por revisión, como máximo tres temas nuevos.
- Fuentes: RSS de tendencias actuales de Google Trends en Colombia y RSS oficiales de Google IA, n8n y OpenAI. Comprueba también el RSS del blog publicado.
- Entrega: señal detectada, enlace de fuente, guía existente que conviene revisar, servicio relacionado y un borrador inicial por tema.
- El usuario autorizó expresamente los permisos de conexión externa, envío de correo y ejecución programada de este proyecto propio, incluido el aviso de aplicación no verificada.
- Dos activadores instalados; comprobación de fuentes sin errores y primer correo con tres borradores confirmado en Gmail. Los identificadores y comprobantes privados están fuera del repositorio.

## Alcance de la selección y los borradores

La selección utiliza reglas, no un modelo de IA. Filtra por temas de atención, automatización, diseño y herramientas aplicables; descarta investigación biológica, financiación y alianzas corporativas. Esta selección no sustituye el criterio editorial ni demuestra demanda comercial.

Los borradores son una base estructurada: entrada, cambio que debe verificarse en la fuente, escenario ilustrativo, criterios de evaluación y llamada a la acción. Identifican claramente los campos pendientes. No inventan capacidades, cifras, casos ni resultados y no se publican automáticamente. Las piezas requieren completar la investigación y revisión antes de publicar. No son artículos originales terminados por un modelo.

El RSS de Trends refleja consultas presentes en tendencias actuales. No ofrece las comparaciones históricas de 30/90 días del radar asistido anterior ni una cobertura exhaustiva de todos los temas de IA. La API oficial de Trends sigue requiriendo acceso alfa. Las comparaciones históricas y la revisión específica de Claude/Kimi pueden continuar en sesiones editoriales.

## Operación y coste

El código está en `automations/google-apps-script/Code.gs`; en el proyecto de Google se llama `Radar.gs`. No hay claves de modelos, API de pago, n8n contratado ni facturación activada por esta implementación. Utiliza las cuotas existentes de Apps Script y MailApp. La continuidad depende de los permisos de Google, las cuotas y la disponibilidad de las fuentes; no se promete funcionamiento ilimitado.

MailApp solo envía mensajes; el código no lee el buzón ni documentos de clientes. El estado de duplicados se conserva en las propiedades privadas del script y almacena hasta 200 huellas compactas. Solo marca temas tras un envío exitoso. Si el proceso se interrumpe durante un envío, `RADAR_PENDING` bloquea el reintento para que se compruebe primero el correo. No borrar esa propiedad sin revisar si el mensaje llegó.

Cuando no hay candidatos nuevos, no se envía correo rutinario. Si faltan todas las fuentes o no se puede comprobar el blog, la ejecución falla sin inventar datos. Si solo falta parte de las fuentes, el informe identifica esa limitación; las ejecuciones fallidas también aparecen en el panel de Google y sus avisos de errores.

`instalarRadar()` reemplaza únicamente los activadores de `ejecutarRadar` de este proyecto. No afecta otros proyectos. `verificarRadar()` consulta fuentes sin enviar correo. `enviarPrimerInforme()` es una prueba manual inicial; no debe programarse como función recurrente.

## Evolución futura

Un modelo podría elaborar borradores más completos usando solo fuentes públicas. Requeriría evaluar proveedor, cuota, permisos y tratamiento de datos en una etapa aparte. No hay conexión de IA activada ni consumo de tokens en esta entrega.

Las pruebas de analítica, orientador y radar, junto con los auditores HTML/GEO, se ejecutan en cada compilación de Netlify. Son controles técnicos, no una garantía de indexación ni posicionamiento.

## Referencias

- [Activadores de Apps Script](https://developers.google.com/apps-script/guides/triggers/installable).
- [Cuotas](https://developers.google.com/apps-script/guides/services/quotas) y [MailApp](https://developers.google.com/apps-script/reference/mail/mail-app).
- [Exportación RSS de Trends](https://support.google.com/trends/answer/3076011?hl=es) y [API alfa de Trends](https://developers.google.com/search/apis/trends).
