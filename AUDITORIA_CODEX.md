# Auditoría independiente del PR #1

> Informe histórico del commit f6656d4. Sus hallazgos fueron atendidos posteriormente; consultar [la revisión final](docs/REVISION_FINAL.md) para el estado vigente.

Fecha local: 29 de octubre de 2026 (America/Bogota).
Rama: `feat/ia-seo-geo-local`.
Commit revisado: `f6656d480fd6f85f748db2e7df057eb2d1f9ab4e`.
PR: https://github.com/edisonabel/edicion-aular-astro/pull/1

## Veredicto

La implementación compila y sus rutas nuevas se generan correctamente. El informe original, sin embargo, declara como verificadas varias condiciones que el código no cumple. Recomiendo corregir los cinco hallazgos siguientes antes de fusionar. No se modificó la implementación ni se publicó una revisión en GitHub.

## Hallazgos

### 1. [P2] Corregir la periodicidad atribuida a la Ley 2300

Ubicación: `src/data/ia/negocio.ts:68`.

El resumen afirma que el consumidor puede contactarse como máximo una vez por semana por el mismo canal. El artículo 3 distingue dos restricciones después del contacto directo: no combinar varios canales en una misma semana y no contactar más de una vez durante el mismo día. No establece el límite semanal que publica la página. El artículo 5 extiende disposiciones a contactos comerciales y publicitarios.

Este texto se reutiliza en las tarjetas normativas de las páginas que seleccionan `ley2300`, por lo que el error se propaga. Corregir la paráfrasis y su referencia antes de presentarla como requisito verificado.

Fuente primaria contrastada: [Ley 2300 de 2023, artículos 3 y 5, Normograma de Colpensiones](https://normativa.colpensiones.gov.co/compilacion/docs/ley_2300_2023.htm).

### 2. [P2] Sustentar las cifras y conservar su población de referencia

Ubicaciones: `src/data/ia/negocio.ts:40` y `src/pages/soluciones-ia/index.astro:122`.

El 40 % se atribuye a “Sondeos empresariales 2025 (Cámara de Comercio / prensa económica)”, con URL vacía. No identifica encuesta, entidad concreta, muestra ni publicación que permitan comprobar la afirmación sobre empresas colombianas. Retirar el porcentaje o aportar una fuente que lo respalde exactamente.

La tarjeta del 62 % (`src/pages/soluciones-ia/index.astro:131`) habla de iniciativas estancadas. Una publicación de Deloitte que sí recoge esa cifra la refiere a organizaciones de una encuesta global, no al porcentaje de iniciativas ni exclusivamente a Colombia. Citar la publicación y conservar esa unidad y alcance.

El enlace de DataReportal existe, pero su texto accesible no permitió verificar el dato específico de WhatsApp. Esto no demuestra que la cifra sea falsa: queda pendiente identificar la diapositiva y población del informe que la sustentan. Las tres tarjetas muestran nombres de fuentes como texto sin enlaces.

Fuentes consultadas: [Deloitte, The Orchestration Gap](https://www.deloitte.com/ca/en/Industries/insurance/perspectives/insurance-point-view-2026-orchestration-gap.html), [DataReportal, Digital 2025: Colombia](https://datareportal.com/reports/digital-2025-colombia).

### 3. [P2] Completar la retirada de la página de mentoría

Ubicaciones: `src/pages/mentoria.astro:6` y `REVISION_MODELO_IA.md:117`.

La compilación sigue generando `/mentoria/index.html`. La página mantiene oferta comercial y enlaces a la agenda de mentoría; `/mentoria/` también aparece en `dist/sitemap-0.xml`. Quitar los enlaces de navegación no elimina la oferta publicada. Los términos y condiciones aún mencionan el servicio.

Si la decisión es retirarlo, resolver la ruta antigua con una redirección permanente hacia un destino pertinente o con una respuesta de retirada, excluirla del sitemap y ajustar las menciones comerciales. El informe original no debe afirmar eliminación total hasta completar estos pasos.

### 4. [P2] Validar los datos de ubicación antes de certificarlos

Ubicación: `src/data/ia/negocio.ts:9`.

El código contiene un TODO que pide reemplazar la dirección por la exacta del perfil de Google Business; `streetAddress` se alimenta únicamente con “El Poblado”. No hay evidencia en el repositorio que permita certificar esa dirección, código postal y coordenadas como ubicación verificada, pese a lo declarado en `REVISION_MODELO_IA.md:101`.

Comprobar los datos con el perfil real y con la modalidad de atención del negocio antes de publicar una dirección postal. No deducir una dirección ni un punto geográfico a partir de la zona de cobertura.

### 5. [P2] Hacer operable el FAQ con teclado

Ubicación: `src/components/geo/FaqList.astro:25`.

Cada disparador es un `div` que contiene un encabezado; el comportamiento se registra exclusivamente mediante `click`. No tiene botón, foco de teclado, manejo de Enter/Espacio ni estado `aria-expanded`. Un usuario que navega con teclado no dispone de un control enfocable para abrir las respuestas.

Usar un botón accesible con estado y asociación al panel, o `details`/`summary`, conservando el diseño. El defecto se confirma por inspección del componente; no se realizó una auditoría completa con lector de pantalla.

## Validaciones realizadas

| Comprobación | Resultado y alcance |
| --- | --- |
| Copia local frente al PR | Rama y commit coinciden con el head publicado. Árbol limpio antes de crear este informe. |
| Estado de Netlify | El check `netlify/edicionaular/deploy-preview` devuelve `success` para el commit revisado. No se inspeccionó la configuración de publicación de producción. |
| `npm run build` | Código de salida 0; 64 páginas estáticas. Una advertencia de imports sin uso dentro de Astro; ninguna advertencia de rutas observada. |
| Rutas nuevas | 21 páginas: 6 de soluciones, 11 de cobertura y 4 de sectores. |
| Enlaces y recursos internos | Los destinos locales absolutos de `href`, `src` y `data-src` de las 21 páginas existen en `dist`. No se validaron todos los fragmentos, enlaces externos ni destinos construidos por JavaScript. |
| Canónicos nuevos | Las 21 páginas apuntan a `https://edicionaular.com/` con sus rutas correspondientes. |
| JSON-LD | Los 261 bloques de las 64 páginas se parsean sin errores. Las preguntas de los FAQ nuevos aparecen entre los encabezados visibles generados. Esto no equivale a validar semántica de Schema.org ni elegibilidad para resultados enriquecidos. |
| Contadores en preview | El árbol accesible muestra +90 %, 40 % y 62 %, sin NaN observado. La revisión de sus fuentes tiene los pendientes descritos arriba. |
| Acordeón en preview | En `/soluciones-ia/`, las respuestas estaban cerradas inicialmente; la primera se abrió al hacer clic y se cerró con otro clic. Inspección visual del estado abierto. No se probaron todos los FAQ ni todos los tamaños de pantalla. |
| Retirada de mentoría | No cumple: página comercial y entrada en sitemap generado presentes. |

## Límites

No se ejecutó Google Rich Results Test, una auditoría de rendimiento ni una revisión visual exhaustiva en móvil y escritorio. Tampoco se verificaron el perfil real de Google Business, resultados de posicionamiento o citación por motores generativos. JSON válido, rastreo permitido y un archivo `llms.txt` no constituyen evidencia de esos resultados.

La única incorporación de esta revisión es este documento. No se hicieron commits, pushes, cambios de producción ni fusiones.
