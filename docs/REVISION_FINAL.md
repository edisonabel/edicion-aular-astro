# Revisión final · Edición Aular

Fecha: 29 de octubre de 2026, America/Bogota. Rama: `feat/ia-seo-geo-local`.

## Resultado

Las 21 páginas de soluciones, cobertura y sectores se revisaron contra los 30 archivos HTML de Bringer entregados. Se mantuvo la identidad de la plantilla y se corrigieron contenido, componentes, semántica, teclado y temas. El sitio compila con 63 páginas: las 64 anteriores menos la oferta de mentoría retirada.

## Correcciones de la auditoría inicial

| Hallazgo | Corrección aplicada |
| --- | --- |
| Mentoría seguía publicada | Se eliminó su página, su tarifa y su categoría de FAQ; se actualizaron términos y textos comerciales. Las variantes `/mentoria` y `/mentoria/` tienen redirección 301 al catálogo en Netlify. No aparece en el sitemap generado. |
| Periodicidad legal errónea | Se corrigió la paráfrasis de la Ley 2300 y se enlazó el texto oficial. Se distinguió una referencia normativa de una certificación de cumplimiento. |
| Cifras sin respaldo | Se retiraron los porcentajes 90/40/62 y las afirmaciones sin fuente en los directorios. Las tarjetas explican criterios de implementación y medición con datos del cliente. |
| Dirección pendiente | Se eliminaron calle, código postal, punto geográfico y horarios no confirmados. Un único `Organization` identifica al negocio con ciudad, región y país; no se publica una sede ficticia como `ProfessionalService`. |
| FAQ dependiente del clic | Se sustituyó por `details`/`summary`: funciona sin JavaScript, con teclado y con su estado accesible nativo. Conserva la presentación de tarjetas de Bringer. |

## Hallazgos adicionales resueltos

- Los cinco servicios reutilizaban beneficios de WhatsApp, aunque fueran de contenido, SEO o formación. Ahora cada ficha muestra sus entregables reales, proceso, variables de inversión y enlaces relacionados.
- Había imágenes grises de demostración y mockups ajenos al servicio. Se creó un catálogo de once imágenes editoriales. Hasta recibir los WebP se muestran tarjetas de diseño, no fotografías falsas ni muestras grises.
- El texto blanco fijo perdía contraste en claro. Las páginas nuevas y los componentes compartidos usan variables del tema; los fondos de acento conservan su tratamiento específico.
- El tema guardado se aplica antes de pintar la página y el selector expone su nombre y estado en español. Hay foco visible y enlace para saltar al contenido.
- Se corrigieron los márgenes grandes que sobresalían en móvil en las cinco soluciones y se evitó forzar tarjetas cuadradas con textos largos.
- El cruce automático de sectores y zonas dejaba fuera hoteles por buscar coincidencias parciales en palabras. Ahora las relaciones son explícitas.
- Los diez textos locales se revisaron para evitar rankings y afirmaciones socioeconómicas sin fuente. Los escenarios se identifican como ejemplos ilustrativos; la cobertura no se presenta como oficinas en cada barrio.
- Se retiraron garantías de ausencia de bloqueos de WhatsApp y promesas de aparecer o ser citado por motores de IA. La migración de un número se describe como una revisión de elegibilidad y opciones del proveedor.
- Se unificó la identidad JSON-LD del layout, eliminando entidades contradictorias y duplicadas. Se escapó `<` al serializar JSON-LD y se retiró una fecha de modificación artificial común a todas las páginas.
- Se simplificó robots.txt para que los buscadores y asistentes reciban las mismas exclusiones de rutas. Esas directivas no sustituyen autenticación.

## Secciones y criterio visual

El mapa completo está en [MAPA_SECCIONES_HTML.md](MAPA_SECCIONES_HTML.md). Incluye orden, título, ancla y referencia de cada sección de las 21 páginas, más el catálogo de los 30 HTML originales.

Se aprovecharon el catálogo detallado y Grid CTA de `services.html`, el proceso compacto de `home06.html`, las composiciones de caso de `portfolio-post01.html`, el enfoque de oferta de `service-details.html` y la presentación FAQ de `pricing.html`.

La formación añade módulos con entregables y una duración que se acuerda en la propuesta. No se inventaron fechas, eventos, ponentes, plazas, premios, clientes ni testimonios para llenar secciones. Los fragmentos de `data-template` son etiquetas descriptivas de procedencia, no IDs que se afirme que existen en los HTML originales.

## Validación técnica y visual

| Verificación | Evidencia |
| --- | --- |
| Build estático | `npm run build`: salida 0, 63 páginas. Permanece una advertencia de imports sin uso dentro de Astro; no se observaron advertencias de rutas. |
| Auditoría del HTML | `python scripts/auditar_geo.py --reference C:/Users/edici/Downloads/HTML`: 21 páginas, 236 bloques JSON-LD parseables en el sitio y 0 errores del auditor. |
| Navegación y metadatos | Un h1, título y descripción únicos, canónico de producción, IDs sin duplicados, destinos internos existentes y secciones con procedencia registrada en las 21 páginas. |
| Identidad y FAQ | Una entidad Organization y un WebSite por página nueva. Preguntas y respuestas JSON-LD coinciden con las respuestas del FAQ nativo generado. |
| Temas y tamaños | 84 combinaciones: 21 rutas × 390/1200 px × claro/oscuro. Otras 12: seis composiciones × 768 px × ambos temas. Sin incidencias pendientes en las mediciones finales. |
| Teclado | En la página de formación, Enter abre la primera pregunta y Espacio la cierra; el foco permanece en SUMMARY. |
| Evidencia visual | `evidencias/faq-claro.png` y `evidencias/faq-oscuro.png`, tomadas en la página normal, con FAQ abierto. |
| Resultado por combinación | `evidencias/verificacion-temas.json`: 96 registros finales. |

El visor de QA usa un iframe con ancho real y desactiva animaciones exclusivamente dentro del visor para medir el diseño estable. Calcula contraste sobre fondos planos; no certifica gradientes, fondos fotográficos futuros ni una auditoría WCAG completa. Los estados del FAQ también se inspeccionaron en la página normal. No se ejecutó Google Rich Results Test ni se midieron Core Web Vitals de producción.

## SEO y acceso a datos

Se instaló la skill gratuita GEO Optimizer de Auriti para usar sus referencias técnicas. Su auditoría inicial del deploy preview produjo 68/100, afectado por el noindex propio del entorno de pruebas y por los canónicos de producción; no se usa esa puntuación como una certificación del SEO del dominio principal.

Se confirmó acceso gratuito directo a la propiedad «Edicion Aular» en Google Analytics. No se vinculó Ryze ni se usaron datos de otras propiedades para este informe. No se activó una prueba ni suscripción de Ryze. Sus herramientas privadas no se usaron para generar este informe. Las métricas de tráfico, consultas, conversiones y posiciones deben obtenerse de las propiedades correctas de Google; las 21 páginas aún no publicadas en producción no tienen una línea base orgánica propia.

Referencias primarias contrastadas:

- [Google: funciones de IA y sitios web](https://developers.google.com/search/docs/appearance/ai-features): no hay un marcado especial que garantice presencia en esas respuestas.
- [Google: datos de negocios locales](https://developers.google.com/search/docs/appearance/structured-data/local-business): no se debe completar una dirección sin datos reales.
- [Ley 2300 de 2023](https://normativa.colpensiones.gov.co/compilacion/docs/ley_2300_2023.htm), artículos 3 y 5.
- [GEO Optimizer](https://github.com/Auriti-Labs/geo-optimizer-skill), referencia de revisión; su puntuación es una rúbrica de la herramienta.

## Comprobación del despliegue

El commit de implementación `de2cda4` se subió al PR #1 y Netlify terminó correctamente el preview. Los checks de redirecciones y headers están en success; el listado de páginas cambiadas es informativo (neutral). Se solicitaron las 21 rutas publicadas: todas devolvieron 200 y el número esperado de FAQ nativos. `/mentoria/` devuelve 301 hacia `/servicios/`. El preview conserva el header noindex esperado para pruebas; no se retiró esa protección.

El título y la descripción original del PR no pudieron editarse con la integración (403) y la sesión web de GitHub no estaba autenticada. La documentación vigente del repositorio sí está actualizada. No se fusionó el PR.

## Imágenes y mantenimiento

[PROMPTS_IMAGENES.md](PROMPTS_IMAGENES.md) contiene once prompts completos, nombre de archivo, alt propuesto y páginas de reutilización. Se eligieron escenas de agencia, atención, administración, desarrollo, producción creativa, formación y operaciones sectoriales, con luz y materiales naturales.

Los archivos deben guardarse en `public/img/ia/` con sus nombres previstos y recompilar. El componente los detecta durante el build. Aún no se generaron imágenes: el recorte, el alt definitivo y el peso deben revisarse al recibir cada archivo.

Comandos de mantenimiento:

```text
npm run build
npm run audit:geo
npm run prompts:imagenes
npm run qa:preview
```

El mapa con inventario de la carpeta de referencia se regenera pasando `--reference` al script Python. El visor de QA solo se sirve en localhost; no se incluye en la web desplegada. No se ha fusionado a main.
