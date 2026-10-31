# Revisión SEO, blog y contacto — 30 de octubre de 2026

> Estado posterior a la revisión: el usuario indicó «a main». Esta tanda se integró y publicó en producción desde `87b2597`, despliegue Netlify `6ae538c59407277f47501a17`, con `index, follow` y canónico correctos. El resto del documento conserva el registro de su preparación y pruebas. La continuación editorial se documenta por separado en `docs/INVESTIGACION_EDITORIAL_IA_2026-10-30.md`.

## Entrega y alcance

Cambios preparados en `feat/optimizacion-seo-blog-contacto`, desde `main` en `9ee8e29`.

- [Vista previa del blog](https://revision-seo-blog-20261030--edicionaular.netlify.app/blog/).
- [Artículo del asistente web](https://revision-seo-blog-20261030--edicionaular.netlify.app/blog/asistente-ia-funnel-web-7-dias/).
- [Contacto](https://revision-seo-blog-20261030--edicionaular.netlify.app/contacto/).

La entrega está en un despliegue borrador de Netlify; no se publicó en producción. Las vistas previas compiladas con `CONTEXT=deploy-preview` o `branch-deploy` declaran `noindex, follow`, conservando los canónicos del dominio principal. Para publicar se debe hacer una compilación nueva en contexto de producción; no promover directamente el directorio `dist` de esta prueba.

## Problemas corregidos

| Área | Hallazgo | Resultado |
| --- | --- | --- |
| Contacto | El formulario enviaba a `/mail.php`, que responde 404 en producción. | Se sustituyó por opciones reales de agenda, WhatsApp y correo, sin simular un envío exitoso ni incorporar otro proveedor. |
| Blog | El listado incluía los cuerpos completos de los 19 artículos en JavaScript y reconstruía tarjetas en el navegador. | Tarjetas y enlaces renderizados por Astro; búsqueda y filtros operan sobre metadatos. No se inserta la consulta como HTML. |
| Newsletter | La interfaz ofrecía suscripción y envíos semanales sin un destino conectado. | Se retiró la promesa y se añadió un RSS válido con 19 artículos y descubrimiento desde la cabecera HTML. |
| Diseño del blog | Colores fijos, espaciados intervenidos por scripts y carrusel de relacionados. | Plantillas más simples, tarjetas compartidas, lectura de ancho limitado, foco visible y variables compatibles con ambos temas. |
| Contenido | El artículo del asistente prometía siete días y usaba experiencias y objetivos numéricos sin acreditar. | Texto actualizado sobre alcance, información, pruebas, límites, derivación humana y medición. Ejemplo identificado como ilustrativo, fuente primaria enlazada y enlaces a servicios pertinentes. |
| Fechas y marcado | Fecha de modificación igualada siempre a publicación y palabras estimadas por tiempo de lectura. | Se conserva la publicación original, se muestra la actualización real cuando existe y se omite el conteo ficticio. `BlogPosting`, autor visible, editor común y `og:type=article`. |
| Navegación | `/testimonials`, `/portfolio-slider` y enlaces del pie sin destino útil. | Enlaces a la sección real de testimonios y al portafolio; retirada de «Mi Equipo» sin destino. |
| Menú | «Servicios» era un enlace `#`. | Destino rastreable `/servicios/`; el menú móvil conserva su despliegue, anuncia su estado y cierra con Escape. |
| Portafolio | Tres páginas sin H1. | Se añadió el título principal del listado y se corrigió la jerarquía de los dos proyectos afectados. |
| Caché | CSS y JS públicos tenían caché de un año con URL estable. | Sus URL incluyen una huella de contenido para entregar la versión nueva cuando cambien. |
| Inicio | Dos inicializadores de video competían entre sí. | Un único inicializador espera la carga y la visibilidad; mantiene el póster y evita iniciar el video si se detecta ahorro de datos o movimiento reducido. |

El artículo actualizado conserva `/blog/asistente-ia-funnel-web-7-dias/`: no se cambia una URL existente por cambiar su título. Las fechas de `lastmod` del sitemap del blog proceden de publicación o actualización declarada, sin atribuir una actualización diaria a todo el sitio.

## Reducción de archivos comprobada

| Recurso | Antes | Después | Reducción aproximada |
| --- | ---: | ---: | ---: |
| HTML del listado del blog, sin compresión de transporte | 171.521 bytes en producción | 68.417 bytes en el build de preview | 60 % |
| Imagen Pop Warner usada en el portafolio | 2.056.680 bytes, 4000 × 2668 | 778.100 bytes, 2000 × 1334 | 62 % |

Se conserva el original de la imagen. Estas cifras describen archivos, no una reducción equivalente del tiempo de carga. PageSpeed Insights devolvió 429 durante esta revisión: no hay una medición nueva de Lighthouse o Core Web Vitals que permita atribuir mejoras de LCP, INP o CLS.

## Verificación realizada

- `npm run build`: 63 páginas compiladas.
- `npm run audit:site`: 63 documentos sin errores en las comprobaciones implementadas de H1, título, descripción, canónico, IDs, sintaxis JSON-LD, destinos y anclas internas, presencia de alt y RSS. Resultado en `docs/auditoria-sitio.json`.
- `npm run audit:geo`: 21 páginas y 237 bloques JSON-LD, sin errores del auditor. Se corrigió una comprobación que resolvía mal las anclas de otra página.
- Pruebas existentes de analítica: siete aprobadas. Cubren consentimiento, carga única, bloqueo en previews y localhost, clasificación y eventos de contacto sin copiar datos del destino.
- Blog, artículo actualizado y contacto: doce combinaciones de móvil/escritorio y claro/oscuro. Sin fallos detectados de contraste en los textos y controles revisados. El límite ampliado de la imagen parallax de contacto está recortado por su contenedor; no implica desbordamiento del texto.
- Búsqueda: «diseno» encuentra contenido con «diseño»; combinación con categoría y estado vacío; una cadena con etiquetas HTML se trata como texto y no crea elementos.
- Menú móvil: apertura con Enter, despliegue de Servicios con estado accesible y cierre con Escape, devolviendo el foco al control.
- Preview remoto: blog y artículo visibles, metadato `noindex, follow` y canónico al dominio principal comprobados. La instrumentación existente limita los envíos a los hosts de producción.

Los auditores comprueban condiciones concretas; no certifican posicionamiento, cumplimiento completo de accesibilidad ni la veracidad editorial de todo el archivo. Las capturas visuales y el export privado de Search Console se guardaron fuera del repositorio.

## Search Console y siguiente etapa

Se revisaron la propiedad correcta, el rendimiento de 28 días, la indexación y los sitemaps, y se guardó una exportación como línea base. El informe de indexación consultado tenía una fecha anterior a la publicación de las páginas nuevas: no permite juzgar todavía su incorporación al índice. No se hicieron solicitudes repetidas de rastreo.

Conviene corregir errores y publicar contenido útil mientras Google rastrea. Google indica que el rastreo puede tardar días o semanas y que una solicitud no garantiza la inclusión. La comparación de resultados se hará sobre periodos equivalentes, anotando la fecha en que estos cambios lleguen a producción. Cuatro semanas es una primera ventana de seguimiento, no una promesa de resultados.

Prioridades restantes:

1. Revisar esta entrega y publicarla cuando el usuario lo indique; verificar después la indexabilidad de producción y los eventos reales de contacto.
2. Separar clic de WhatsApp, contacto recibido y reserva confirmada al evaluar consultas comerciales. Los tests del código no demuestran por sí solos una reserva o una venta.
3. Validar con el negocio cifras, testimonios y experiencias del contenido anterior. Los otros 18 cuerpos de artículos siguen pendientes de revisión editorial y de fuentes; las guías de productos requieren documentación vigente.
4. Actualizar adopción de IA y después preparar la comparación WhatsApp Business/agente, siguiendo `docs/PLAN_SEO_CONTINUIDAD.md`. Evitar páginas locales clonadas y ampliaciones sin una necesidad clara.
5. Revisar el catálogo de la agenda externa: se había observado una oferta de mentoría fuera del sitio. No se modificó la cuenta de Cal.com en esta entrega.
6. Medir rendimiento real cuando PageSpeed vuelva a estar disponible y ampliar la revisión de contraste a las plantillas antiguas. No se ha presentado una certificación global de ambos temas.

No se añadieron herramientas SEO de pago ni nuevas dependencias.

## Referencias

- [Google: solicitar un nuevo rastreo](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
- [Google: contenido útil y fiable](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- [Google: experiencia de página](https://developers.google.com/search/docs/appearance/page-experience).
- [Dialogflow CX: respuestas generativas de respaldo](https://docs.cloud.google.com/dialogflow/cx/docs/concept/generative-fallback), referencia enlazada en el artículo, sin afirmar que sea la plataforma implementada por el negocio.
