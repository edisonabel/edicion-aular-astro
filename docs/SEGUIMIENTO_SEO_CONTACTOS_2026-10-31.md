# Seguimiento de SEO, contactos y radar · 31 de octubre de 2026

## Search Console y medición

- Propiedad revisada: `https://edicionaular.com/`.
- Ventana del 1 al 28 de octubre: 170 impresiones, 0 clics, CTR 0 % y posición media 7,2. Termina antes de los últimos cambios; no permite atribuirles resultados.
- Páginas con impresiones: oferta irresistible (66), stack de valor (51), Nano Banana (31), inicio (16), value ladder (9), términos (7). Las sumas por URL pueden diferir del total de la propiedad.
- Ambos sitemaps constaban como correctos, con 43 páginas descubiertas en sus lecturas anteriores del 23 y 25 de octubre. La compilación actual contiene 70 páginas. Descubrimiento, indexación y publicación son estados distintos.
- GTM conserva el ID `GTM-TKRFCRBN` y GA4 `G-2CTQCP83WM`, propiedad Edicion Aular. El activador permite los cuatro clics de contacto y ahora también `generate_lead`.
- `generate_lead` se produce después de la aceptación de Resend, solo con consentimiento de analítica. No demuestra lectura ni atención de la consulta. Los clics de WhatsApp, agenda, teléfono y correo se mantienen separados.
- Los eventos contienen ruta, canal y ubicación del control; no nombre, correo ni respuestas. Las pruebas también comprueban que localhost y los previews no envían medición.

## Radar

- Confirmada la recepción en Gmail del informe de Google Apps Script fechado 30 de octubre, con tres propuestas y sus fuentes.
- Los borradores son estructuras por reglas con campos para completar y verificar. No son artículos terminados por un modelo ni se publican automáticamente.
- Programación existente: lunes y jueves entre 09:00 y 10:00, zona America/Bogota. La siguiente ventana posterior a esta revisión corresponde al lunes 2 de noviembre.
- Se mantiene sin nuevas suscripciones ni llamadas a una API de IA.

## Continuidad editorial

Dos artículos añadidos con fecha de publicación 31 de octubre:

1. `/blog/memoria-agentes-ia-que-guardar/`: contexto, sesiones, vigencia, pruebas y límites de Simple Memory en n8n.
2. `/blog/web-creada-con-ia-revision-antes-publicar/`: ocho comprobaciones de contenido, contacto, formularios, accesibilidad, carga, indexación, credenciales y medición.

Fuentes enlazadas en cada artículo: documentación oficial de n8n, Google Search Central y web.dev. La publicación de memoria del blog de n8n se identifica como colaboración de un proveedor. No se presentan ejemplos como resultados de clientes.

Consulta de Google Trends: Colombia, términos «agentes de IA» y «n8n», últimos doce meses. La página mostraba consultas relacionadas en ascenso, entre ellas Claude, Claude Code y n8n skills. Es una señal relativa para investigar, no volumen absoluto ni prueba de demanda del título concreto. Los dos artículos responden a necesidades operativas y no se etiquetan como virales.

Se comprobaron los 24 registros anteriores contra una copia previa: permanecen íntegros. Se conservan los 19 artículos históricos, las cinco publicaciones anteriores de IA, el diseño y sus portadas. Las 26 imágenes tienen archivos y hashes distintos. Las dos nuevas usan fotografías ya aportadas: negocios-medellin y desarrollo-web.

## Correo del orientador

El canal se añade dentro del modal existente como opción secundaria a WhatsApp. La página de contacto conserva su composición.

- Remitente previsto: `Edición Aular <info@edicionaular.com>`.
- Destinatario fijo autorizado: `edicionaular@gmail.com`.
- La respuesta se dirige al correo indicado por el visitante mediante Reply-To.
- El dominio quedó verificado en Resend mediante tres registros DNS específicos. No se sustituyeron los registros de la web.
- La configuración de envío no crea un buzón receptor para info@. Para recibir correo dirigido a esa dirección hace falta configurar recepción o reenvío.
- Función Netlify con clave privada, validación de respuestas y autorización, tamaño limitado, origen permitido, campo antispam, límite de solicitudes e idempotencia de Resend.
- El navegador consulta disponibilidad. No muestra el canal si falta configuración. Un fallo conserva las respuestas y permite reintentar o continuar por WhatsApp.
- El nombre es opcional. Se requiere correo de respuesta y autorización para responder la consulta. No hay suscripción publicitaria ni envío a modelos de IA.

La conexión efectiva y su comprobación de entrega se registran al terminar la configuración. No debe darse por recibida una consulta basándose solo en una respuesta HTTP de la API.

## Validación de implementación

- Compilación de producción: 70 páginas y RSS con 26 artículos; auditorías HTML y GEO sin errores.
- 21 pruebas de analítica, orientador, radar y correo. Incluyen origen ajeno, datos inválidos, cuerpos grandes, destinatario fijo, errores del proveedor, idempotencia y ausencia de datos personales en medición.
- Dos artículos revisados a 390, 768 y 1200 px en ambos temas. Sin fallos detectados de contraste ni solapamientos en fondos planos; las diapositivas fuera de pantalla pertenecen al carrusel recortado.
- Formulario de correo revisado en los mismos seis tamaños/temas, sin desbordamientos ni fallos detectados de contraste. Error local probado con datos ficticios y sin enviar correo.

Las evidencias privadas, los identificadores de conexión y cualquier secreto permanecen fuera del repositorio.
