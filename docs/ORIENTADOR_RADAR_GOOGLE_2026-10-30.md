# Orientador de proyectos, radar en Google y corrección de pasos

Fecha: 30 de octubre de 2026, America/Bogota.

## Orientador

Contacto conserva su portada, galería y tarjetas de contacto. Su bloque final se adaptó después a la composición de home02.html, sin contadores; ver REVISION_ESTILO_CONTACTO_2026-10-30.md. El botón «Ayúdame a definir mi proyecto» abre un modal opcional con tres pasos: necesidad, situación actual y contexto opcional. Siete necesidades con tres situaciones cada una producen una recomendación acotada, un servicio relacionado y un resumen revisable para WhatsApp. Permite volver y cambiar respuestas; al cambiar de necesidad descarta la situación incompatible. Los canales directos de WhatsApp, agenda, correo y teléfono siguen disponibles.

La orientación utiliza reglas y se presenta como orientador, sin afirmar que conversa con IA. No guarda las respuestas ni llama a una API. El contexto tiene límite de 360 caracteres. El texto se renderiza con textContent y se codifica para la URL. El botón de WhatsApp no expone un href con las respuestas; la navegación con el resumen ocurre al activar el botón. Así se evita añadir el contexto a la medición automática de enlaces. WhatsApp presenta el mensaje y el visitante decide cuándo enviarlo.

Inicio y Servicios enlazan al botón del orientador. No se abre automáticamente al entrar en Contacto. El modal usa dialog.showModal(): botón de cierre, Escape, foco contenido y devolución del foco al botón original. Conserva las respuestas mientras se permanece en la página. Progreso visible, una pregunta por paso y resumen desplegable. Referencias de estructura: [Kombai Stepper](https://kombai.com/gallery/web/stepper/); implementación nativa de [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), sin nuevas dependencias.

La función pura recommendProject separa las reglas de la interfaz. Una eventual interpretación mediante IA debe ser una implementación futura del servidor, con credenciales fuera del navegador, límites y validación de salidas; no hay una integración de modelos activada.

## Secciones de proceso

Las capturas del usuario mostraban títulos y descripciones superpuestos en las cinco soluciones. La causa era la clase de plantilla bringer-subgrid-item: definía subgrid y un tramo de dos filas para tres hijos (número, título y descripción). Los controles anteriores de desbordamiento y contraste no detectaban la intersección entre esos hijos.

ProcessSteps.astro reemplaza esa estructura por una lista ordenada, con cuadrícula exterior y columnas flexibles para cada paso. Cada texto ocupa su altura natural, con separación explícita y una columna en móvil. Se retiró la regla de márgenes que intentaba compensar el componente anterior.

El visor QA añade detección de solapamientos entre hijos de las tarjetas de proceso, entregables, módulos y lecturas. Las comprobaciones de geometría y contraste del visor se complementan con revisión del sitio normal, con sus animaciones activas. Un visor que desactiva animaciones no representa por sí solo toda la experiencia de producción.

## Radar en Google

Configuración y límites detallados en RADAR_EDITORIAL_IA.md. Dos activadores semanales privados en Google, lunes y jueves de 09:00 a 10:00 de Colombia. Primer correo con tres borradores confirmado en Gmail. Radar local pausado para evitar duplicados. Sin claves, modelos de IA o servicios de pago adicionales.

## Validación

- Compilación estática: 68 páginas y 24 artículos en RSS; auditores HTML/GEO sin errores.
- 15 pruebas: ocho de analítica, dos del orientador que cubren las 21 combinaciones y cinco del radar (destinatario/deduplicación, envío incierto, horario, escape/límites y filtro comercial).
- 126 revisiones de las 21 páginas GEO: 390, 768 y 1200 píxeles, claro/oscuro. Sin incidencias en los controles de desbordamiento, contraste y solapamientos internos medidos.
- Orientador: cuatro estados en móvil/escritorio y claro/oscuro, siete recomendaciones en móvil y recorrido por teclado. Apertura real de WhatsApp comprobada con un mensaje ficticio: destinatario correcto y resumen completo, sin enviar el mensaje. Se redujo el espacio superior del orientador para facilitar el acceso a las opciones. Producción verificada en las cinco soluciones, Contacto, Inicio y Servicios.
- Corrección de Contacto: diseño anterior restaurado y orientador trasladado a un modal voluntario. 24 vistas del modal (cuatro estados, tres anchos, dos temas) sin incidencias en desbordamiento o contraste medidos. Validación vacía, navegación por teclado, resumen desplegable y conservación de respuestas al cerrar/reabrir comprobados.
- Fuentes leídas desde Google sin errores y correo inicial verificado; comprobantes privados fuera del repositorio.

No se ejecutó una nueva medición de Core Web Vitals ni se declara una certificación de accesibilidad completa. El radar no publica automáticamente y los borradores necesitan completar y revisar las fuentes.
