# Contenido, enlazado y radar editorial

Fecha: 30 de octubre de 2026, America/Bogota.

El usuario autorizó continuar el plan, aplicar mejoras SEO, publicar en `main` y recibir informes de tendencias en `edicionaular@gmail.com` si no se añadía un servicio de pago.

## Publicaciones

La revisión de 18 artículos y las guías de Claude Design y Kimi se integraron desde `fa8a1f1` y se publicaron en producción desde `18a1971`. Netlify confirmó el despliegue `6ae5400d4fc26fd5db7fc55d`.

Esta continuación añade:

- [WhatsApp Business o agente de IA](https://edicionaular.com/blog/whatsapp-business-o-agente-ia-como-elegir/): diferencia canal, organización humana, flujo definido y agente; evaluación y costes por capas.
- [Consultas y citas en una clínica](https://edicionaular.com/blog/consultas-citas-clinica-recepcion-ia/): flujo administrativo ilustrativo, responsables, agenda y límites frente a decisiones clínicas; referencia a datos sensibles.
- [n8n y agentes de IA](https://edicionaular.com/blog/n8n-agentes-ia-automatizacion-flujos/): reglas frente a interpretación, permisos de herramientas, revisión y recuperación de errores; mantenimiento y ediciones.

El blog pasa a 24 artículos; conserva las URL anteriores. Se reutilizan fotos aportadas por el usuario con dimensiones y alt descriptivos. Los ejemplos están identificados como ilustrativos y no se atribuyen resultados a clientes.

## Enlaces y descubrimiento

Las cinco páginas de soluciones incorporan lecturas pertinentes mediante `RelatedReading.astro`; el sector de clínicas enlaza sus dos guías relacionadas. Las llamadas a la acción de los artículos nuevos conducen al servicio correspondiente. Una referencia configurada a un artículo inexistente hace fallar la compilación, en lugar de publicar un enlace vacío.

RSS y sitemaps se actualizan desde el archivo de contenidos. `llms.txt` incluye los nuevos recursos como mapa para agentes; ese archivo es una convención y no garantiza visibilidad en buscadores ni respuestas de IA. El mapa de secciones se regenera con las nuevas secciones de lecturas, usando las tarjetas de servicios de Bringer como referencia adaptada.

## Controles que se ejecutan en cada compilación

`postbuild` ejecuta las siete pruebas existentes de analítica y los dos auditores con Python estándar. Esto sucede también en Netlify. Se mantiene la compilación estática y no se añade una consulta a IA en las visitas del sitio.

El auditor verifica el metadato robots por contexto: bloquea `noindex` o `nofollow` en producción y exige `noindex` en previews. La comprobación se probó introduciendo temporalmente un `noindex` en HTML generado: el auditor falló como correspondía; después se restauró el archivo y volvió a pasar. No quedó un bloqueo en el HTML de producción.

Netlify se alinea con Node 22, utilizado en la validación local; no se cambió la versión de Astro ni se añadieron dependencias. Los límites de los auditores siguen vigentes: no certifican accesibilidad completa, resultados de negocio, indexación ni posicionamiento.

## Verificación

- 68 páginas compiladas; RSS con 24 artículos.
- Auditores de sitio y GEO sin errores en sus comprobaciones; siete pruebas de analítica aprobadas.
- 36 combinaciones de revisión: tres artículos nuevos, cinco soluciones y sector de clínicas, 390/1200 píxeles, claro/oscuro. Sin incidencias finales de desbordamiento ni contraste en el contenido medido.
- Se corrigió el visor local para desactivar transiciones de tema durante la medición. Las mediciones anteriores podían capturar colores intermedios; el cambio del visor no altera las transiciones del sitio publicado.
- Estado de la automatización confirmado como activo. La comprobación de envío inicial por Gmail y el despliegue final se verifican al cerrar esta entrega; los comprobantes de correo permanecen fuera del repositorio.

## Radar de temas

El funcionamiento y las condiciones están en `docs/RADAR_EDITORIAL_IA.md`. Se programaron lunes y jueves, 09:00 de Colombia, con Gmail como canal autorizado. Las revisiones sin oportunidades nuevas no generan un correo rutinario. El estado permite evitar duplicados y distinguir artículo nuevo de actualización.

Se probó una consulta real de Trends, Colombia, últimos 90 días, búsqueda web, con los términos «n8n», «WhatsApp Business» y «agentes de IA». El gráfico mostró medias relativas 13 / 63 / 1. En las relacionadas de WhatsApp Business aparecieron consultas de diferencias entre productos y de soporte. No son volúmenes absolutos ni prueba de contratación; la elección de las guías combina esta señal con su pertinencia comercial.

La automatización utiliza la app de Codex y Gmail existentes. No se contrató API, servidor, plan SEO o proveedor de email adicional. Depende de que el equipo y la app estén disponibles para trabajar con el repositorio local; no se presenta como ejecución permanente en una nube independiente. Las piezas siguen necesitando creación y revisión editorial.

## Fuentes primarias

- [Funciones de WhatsApp Business](https://whatsappbusiness.com/products/business-app-features/) y [tarifas de Business Platform](https://whatsappbusiness.com/products/platform-pricing/).
- [AI Agent de n8n](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/), [revisión humana de herramientas](https://docs.n8n.io/advanced-ai/human-in-the-loop-tools/) y [ediciones autoalojadas](https://docs.n8n.io/hosting/community-edition-features/).
- [Ley 1581 de 2012](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981), especialmente artículos 5, 6 y 9–12. La pieza no declara cumplimiento automático de una implementación.
- [Datos de Google Trends](https://support.google.com/trends/answer/4365533?hl=es) y [comparación consultada](https://trends.google.com/trends/explore?date=today%203-m&geo=CO&q=n8n,WhatsApp%20Business,agentes%20de%20IA&hl=es).
- [Tareas programadas](https://learn.chatgpt.com/docs/automations) y [notificaciones](https://learn.chatgpt.com/docs/notifications): condiciones y opciones de la app.
