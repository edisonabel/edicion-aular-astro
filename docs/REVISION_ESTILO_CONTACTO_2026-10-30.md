# Revisión de estilo de Contacto y pie de página

Fecha: 30 de octubre de 2026, America/Bogota.

Se revisaron las secciones de contacts.html, home02–home08.html, about-us.html y services.html en C:/Users/edici/Downloads/HTML. Se tomaron como referencias visuales y estructurales, sin ejecutar sus formularios PHP ni importar sus datos de demostración.

| Área | Referencia inspeccionada | Adaptación |
| --- | --- | --- |
| Bloque final de Contacto | home02.html y services.html, `.bringer-bento-grid.bringer-grid-cta` | Imagen grande, título y dos acciones diferenciadas. Cuadrícula adaptable, sin depender de subgrid ni máscaras JS. |
| Bloque sustituido | contacts.html, `.stg-cta-with-image` | Se retiran el texto dirigido a agencias, el título sobredimensionado, la caja de enlaces repetidos y sus contadores. |
| Orientador | Modal existente de ProjectGuide.astro | Se conserva el modal y su recorrido por teclado. El botón se integra en la nueva composición. |
| Cookies | Pie de BaseLayout + Analytics.astro | Texto neutro de 12 px, sin fondo ni borde, estados hover/active neutros y foco visible. Se conserva el área de interacción y el funcionamiento. |

Se elimina «1399 proyectos» de Contacto y «1500 proyectos» de Inicio. No se reemplazan por otra cifra. Inicio enlaza a proyectos del portafolio. No se declaran nuevas estadísticas de clientes o antigüedad.

La fotografía ya había sido entregada por el usuario y se reutiliza desde /img/ia/agencia-ia.webp. El alt describe la escena; no identifica a las personas como el equipo real de la agencia. No se añaden dependencias ni APIs.

El visor QA permite aislar los bloques modificados y comprobar también el estilo calculado de las preferencias de cookies; su revisión completa de páginas sigue disponible.

Validación: build estático de 68 páginas, 24 entradas RSS, 15 pruebas y auditores HTML/GEO sin errores. Doce combinaciones de los bloques modificados (Contacto/Inicio, 390/768/1200 px, claro/oscuro) sin solapamientos, desbordamientos o contraste insuficiente en los controles medidos. El enlace de cookies mantiene fondo transparente y tipografía de 12 px en esas combinaciones; apertura y rechazo del aviso comprobados. Revisión visual adicional del bloque de Contacto en móvil claro y escritorio oscuro.
