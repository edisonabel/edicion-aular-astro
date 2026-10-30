# Plan de continuidad SEO: del contenido a las consultas comerciales

Preparado el 29 de octubre de 2026 para retomar en otra sesión. Calendario relativo al inicio del trabajo, sin publicaciones ni recordatorios programados.

## Objetivo y enfoque

Usar el blog para resolver dudas previas a la contratación y conducir a las soluciones de IA, los servicios y los sectores que ya publicamos. Priorizar consultas comerciales útiles para Edición Aular, con ejemplos claros y experiencia verificable.

La siguiente etapa recomendada combina actualización del archivo, enlaces internos y dos artículos nuevos. No hace falta ampliar ahora las páginas por barrios. Las prioridades editoriales son hipótesis: se ajustarán al consultar Search Console y las preguntas reales de clientes; no se han estimado volúmenes de búsqueda ni posiciones.

## Punto de partida comprobado

- `main` incorpora el PR #1. El dominio principal ya sirve las 21 páginas nuevas, las diez fotos y el menú simplificado.
- `src/data/blog.json` contiene **19 artículos y 12 categorías**. Las fechas declaradas van del 5 de diciembre de 2024 al 20 de noviembre de 2025.
- Los cuerpos de esos artículos no contienen enlaces a `/soluciones-ia`. Los enlaces generales del menú y del pie no sustituyen una recomendación contextual dentro de un texto.
- Ya existen artículos sobre asistentes web, agentes de IA y priorización de proyectos. Conviene revisarlos antes de crear contenidos que respondan a la misma pregunta.
- El blog tiene autor visible y marcado `Article`. La plantilla iguala `dateModified` a `datePublished` y estima `wordCount` a partir del tiempo de lectura; son puntos concretos de mantenimiento.
- Hay colores blancos fijos en elementos del blog que requieren revisión en modo claro. Esta lectura del código no constituye una prueba visual del blog.
- Algunos títulos y textos prometen plazos o mejoras cuantificadas; también hay relatos en primera persona. Deben comprobarse con el autor y con evidencia antes de reutilizarlos.

Archivos para retomar: `src/pages/blog.astro`, `src/pages/blog/[slug].astro`, `src/data/blog.json`, `src/data/ia/soluciones.ts` y `src/lib/schema.ts`.

## Primera sesión: fundamentos y una actualización

Duración orientativa: 2–3 horas, según el acceso a los datos y la revisión editorial.

1. **Comprobar Search Console de edicionaular.com.** Revisar propiedad, sitemap, indexación y consultas. Inspeccionar una muestra de las páginas nuevas. Una URL accesible sin `noindex` puede ser indexable sin estar todavía indexada.
2. **Guardar una línea base.** Exportar los últimos 28 días por consulta y página, separando marca, servicios y blog. Registrar la fecha de publicación de las páginas nuevas para interpretar los cambios posteriores.
3. **Comprobar medición de consultas.** En la propiedad correcta de Analytics, verificar los clics hacia WhatsApp y la agenda. Un clic es intención de contacto; una reserva o un prospecto calificado requiere confirmación adicional.
4. **Revisar la plantilla del blog.** Probar móvil y escritorio, ambos temas, búsqueda, filtros, foco visible, imágenes y llamadas a la acción. Revisar el formulario de newsletter antes de seguir prometiendo envíos semanales.
5. **Actualizar el artículo del asistente web.** Conservar inicialmente su URL, comprobar la experiencia narrada y sustituir la promesa general de siete días por un alcance explicado. Añadir un enlace contextual a la solución de agentes de IA y un siguiente paso coherente.

**Resultado concreto:** línea base guardada, incidencias priorizadas y una actualización lista para revisar en preview. Confirmar el acceso a Search Console es una dependencia; si falta, se puede avanzar con la revisión editorial y técnica.

## Primer ciclo de cuatro semanas

Ritmo propuesto: una pieza trabajada por semana, contando las actualizaciones. Publicar después de revisar su contenido y funcionamiento; el calendario no obliga a llenar una cuota.

| Semana | Trabajo editorial | Pregunta que resuelve | Destino comercial |
| --- | --- | --- | --- |
| 1 | Actualizar `/blog/asistente-ia-funnel-web-7-dias` | ¿Qué necesita un asistente web para responder, calificar y pasar a una persona? | `/soluciones-ia/agentes-ia-whatsapp/` |
| 2 | Nuevo: «WhatsApp Business o agente de IA: cómo elegir según tu operación» | ¿Cuándo bastan las funciones de la aplicación y cuándo conviene evaluar una integración? | `/soluciones-ia/agentes-ia-whatsapp/` |
| 3 | Actualizar `/blog/adopcion-ia-embudos-marketing` | ¿Qué proceso conviene automatizar primero y cómo decidirlo? | `/soluciones-ia/automatizacion-procesos-ia/` |
| 4 | Nuevo: «Cómo organizar consultas y citas en una clínica con apoyo de IA» | ¿Qué puede atender recepción, qué debe escalarse y cómo diseñar el flujo? | `/sectores/clinicas-estetica/` |

Los títulos son propuestas editoriales, no palabras clave validadas por volumen. En la semana 2 se contrastarán funciones, requisitos y posibles costos con la documentación vigente de Meta; no se prometerá que una integración sea gratuita. En la semana 4 se usará un ejemplo identificado como ilustrativo, sin datos de pacientes ni afirmaciones clínicas.

## Qué debe contener cada pieza

- Una respuesta breve al problema al principio y un título que describa su alcance sin exagerar.
- Un ejemplo de proceso: entrada de la consulta, información necesaria, acción y paso a una persona.
- Criterios de decisión, límites y situaciones en las que la solución no compensa.
- Evidencia propia autorizada o fuentes primarias enlazadas cerca de las afirmaciones. No añadir estadísticas para decorar el texto.
- Autor responsable y fecha de actualización real, consistente con los datos estructurados. Conservar la fecha original de publicación.
- Un enlace contextual hacia el servicio pertinente y, cuando ayude, otro hacia un artículo relacionado. Usar texto descriptivo en enlaces HTML rastreables.
- Una llamada a la acción asociada al problema: evaluar un flujo, revisar consultas o conversar sobre el alcance.
- Una foto existente cuando encaje, con alt descriptivo y encuadre revisado. No hacen falta imágenes nuevas para cada artículo.

No se fija una extensión de palabras como objetivo SEO. La pieza debe responder bien a la pregunta y aportar algo útil que no esté ya explicado en otra URL.

## Mantenimiento del archivo existente

1. Revisar conjuntamente los artículos `asistente-ia-funnel-web-7-dias` y `ai-agents-embudo-tendencia-2025`. Darles propósitos distintos si aportan información diferente. Considerar consolidación y redirección solo después de revisar contenido, consultas y enlaces; no borrar por antigüedad.
2. Verificar las promesas de conversión, porcentajes y experiencias personales. Respaldarlas, matizarlas o retirarlas si no se pueden acreditar.
3. Revisar las guías sobre versiones de ChatGPT, Gemini y otras herramientas con sus fuentes oficiales. Actualizar su alcance cuando sea útil; conservar las URL mientras sigan respondiendo a una intención válida.
4. Evaluar si las 12 categorías ayudan a navegar con solo 19 artículos. Simplificar únicamente si mejora la organización; no crear nuevas páginas indexables de categorías vacías.
5. Mantener `Article` o usar `BlogPosting` de forma coherente, enlazando al editor mediante el identificador común de Organization. Calcular el número real de palabras u omitir ese dato si no se mantiene.
6. Revisar los artículos relacionados para que sean pertinentes. El mecanismo actual no garantiza que los artículos de relleno sean los más recientes.

## Enlazado y continuidad local

Recorrido deseado: **duda del cliente → artículo útil → solución o sector → conversación sobre el proyecto**.

Desde las páginas de soluciones se podrán añadir lecturas complementarias cuando los artículos estén actualizados. Los enlaces deben tener sentido para la persona; no es necesario colocar todos los enlaces en todas las páginas.

Medellín y Valle de Aburrá seguirán presentes cuando aporten contexto real de operación y cobertura. Evitar artículos clonados para cada barrio. Como tarea posterior, revisar la coherencia del perfil de negocio de Google y los datos de contacto existentes; cualquier dirección pública debe verificarse con el negocio.

## Medición y decisiones

| Pregunta | Dónde comprobarla | Cómo actuar |
| --- | --- | --- |
| ¿Google puede descubrir e indexar las páginas? | Search Console: sitemap, indexación e inspección | Corregir primero los bloqueos o problemas técnicos documentados. |
| ¿Con qué consultas aparecen los artículos y servicios? | Search Console: consultas y páginas | Ajustar el enfoque a las búsquedas pertinentes para el negocio. |
| ¿Una página recibe impresiones pero pocos clics? | Search Console: consulta, CTR, posición y dispositivo | Revisar la correspondencia entre intención, título y descripción; no atribuirlo solo al título. |
| ¿Los lectores pasan del artículo al servicio? | Analytics: navegación y eventos verificados | Revisar el enlace y el siguiente paso cuando haya datos suficientes. |
| ¿Se generan conversaciones o citas útiles? | Agenda y registro comercial del negocio | Distinguir clic, contacto, reserva y prospecto calificado. |

Revisar tras unas cuatro semanas y de nuevo a las ocho. Son ventanas de seguimiento, no plazos prometidos de posicionamiento. Comparar periodos equivalentes, anotar los cambios publicados y evitar conclusiones fuertes con pocas impresiones o contactos.

Herramientas previstas: Search Console, la propiedad de Analytics existente, PageSpeed Insights y las utilidades locales del proyecto. No se contempla contratar Ryze ni herramientas SEO de pago.

## Segunda tanda, según los datos

- SEO y GEO para una web de servicios: qué revisar y cómo medirlo → `/soluciones-ia/sitios-web-seo-geo/`.
- Fotos y contenido de producto con IA: cuándo ayudan y cuándo conviene una producción real → `/soluciones-ia/contenido-video-ia/`.
- Cómo preparar un equipo para usar IA en sus tareas → `/soluciones-ia/capacitacion-ia-empresas/`.
- Reservas en hoteles o seguimiento de visitas inmobiliarias, eligiendo primero el sector con preguntas o demanda verificadas.
- Una explicación del trabajo realizado en la propia web de Edición Aular, con capturas y decisiones reales. No atribuir resultados de tráfico o ventas hasta haberlos medido.

## Referencias contrastadas

- [Contenido útil y fiable, Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): orientar el contenido a las personas, aportar información original y evitar exageraciones.
- [Funciones de IA y sitios web, Google](https://developers.google.com/search/docs/appearance/ai-features): las buenas prácticas SEO siguen siendo aplicables; no hay una optimización especial que garantice aparecer en respuestas de IA.
- [Enlaces rastreables y texto descriptivo, Google](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): fundamento del enlazado contextual propuesto.
- [Datos estructurados de artículos, Google](https://developers.google.com/search/docs/appearance/structured-data/article): referencia para autor, imágenes y fechas.
- [Informe de rendimiento, Search Console](https://support.google.com/webmasters/answer/7576553?hl=es): consultas, páginas, clics, impresiones, CTR y posición.

## Prompt para retomar

### Avance del 30 de octubre de 2026

La revisión de Search Console y la exportación de la línea base están realizadas; los datos privados se guardaron fuera del repositorio. El informe de indexación consultado precede a la publicación de las páginas nuevas, por lo que aún no evalúa esos cambios.

La plantilla del blog, ambos temas, búsqueda, filtros, RSS, contacto y actualización del artículo del asistente están preparados en [vista previa](https://revision-seo-blog-20261030--edicionaular.netlify.app/blog/), en `feat/optimizacion-seo-blog-contacto`. Las siete pruebas existentes de analítica pasan; la comprobación de eventos tras publicar y la validación comercial siguen siendo tareas distintas. No se publicó esta entrega en producción.

El detalle de cambios, pruebas y límites está en `docs/REVISION_SEO_UX_2026-10-30.md`. Para retomar, empezar por revisar/publicar esa entrega cuando el usuario lo indique y comprobarla en producción; después continuar con adopción de IA y la comparación WhatsApp Business/agente. Comparar resultados aproximadamente cuatro semanas después de publicar, según el volumen de datos. No repetir como pendientes las tareas técnicas ya realizadas ni considerar revisados los otros 18 cuerpos de artículos.

> Retoma `docs/PLAN_SEO_CONTINUIDAD.md` y `docs/REVISION_SEO_UX_2026-10-30.md` en el repositorio Edición Aular. Comprueba primero el estado de la rama `feat/optimizacion-seo-blog-contacto` y su publicación: la revisión técnica del blog, la actualización del asistente web y la exportación de Search Console ya se realizaron el 30 de octubre. Si el usuario autoriza publicar, compila de nuevo en contexto de producción y verifica indexabilidad, navegación, ambos temas y eventos de contacto. Continúa con la revisión editorial de adopción de IA y la comparación WhatsApp Business/agente, consultando fuentes oficiales vigentes y las dudas reales del negocio. Conserva las URL existentes mientras no haya evidencia para cambiarlas, valida experiencias y cifras con el autor y prepara los siguientes cambios en una rama con preview. Mantén el enfoque de soluciones a medida, sin mentoría y sin herramientas SEO de pago. Para comparar resultados, toma como referencia la fecha real de publicación y periodos equivalentes con datos suficientes. No publiques en producción sin indicación del usuario.
