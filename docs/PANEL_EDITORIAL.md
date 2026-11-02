# Estudio editorial de Edición Aular

Ruta prevista: `https://edicionaular.com/admin/`. El panel administra borradores y publicaciones; no cambia el diseño del blog público.

## Uso

1. Entrar con la cuenta invitada del propietario.
2. Elegir el artículo y leer la vista previa, su portada y sus fuentes.
3. Si se cambia el texto, usar **Guardar borrador** antes de iniciar la publicación.
4. Pulsar **Revisar y publicar** y confirmar las tres revisiones.
5. Pulsar **Publicar artículo** o **Publicar actualización**.
6. Esperar el despliegue y comprobar la URL pública. Un commit aceptado no demuestra que Netlify haya terminado la compilación.

Los temas enviados por el radar no se convierten automáticamente en artículos terminados. Hay que desarrollarlos, contrastarlos y cargarlos como borradores antes de publicarlos.

## Autorización y almacenamiento

- Netlify Identity, registro exclusivamente por invitación.
- La función exige una sesión verificada por `@netlify/identity`, el correo `edicionaular@gmail.com` y el rol administrativo `editorial-admin` establecido por el servidor.
- Ninguna contraseña ni token de GitHub se incluye en el HTML del panel.
- Los borradores se guardan en el store privado de Netlify Blobs `editorial-private`, clave fija `drafts`. No se incorporan a GitHub ni al directorio público.
- Las ediciones usan el ETag del borrador y una escritura condicional. Si otra edición se adelantó, se pide recargar.
- La publicación lee la versión actual de `src/data/blog.json` en `main` y la actualiza mediante GitHub Contents API con su SHA. No permite elegir repositorio, rama ni ruta de escritura desde el navegador.
- La credencial prevista, `EDITORIAL_GITHUB_TOKEN`, debe ser de alcance granular: solo este repositorio, Contents lectura/escritura, con caducidad y guardada como variable privada de producción en Netlify. El plan gratuito utilizado no permite prometer aislamiento exclusivo a funciones.
- No reutilizar el token amplio del CLI para este fin. No activar Git Gateway: Netlify lo documenta como obsoleto para nuevas configuraciones.
- La autenticación, el panel y las API quedan fuera de la caché del service worker. Antes de autenticarse, el panel actualiza el worker previo que almacenaba todos los GET.
- El panel tiene `noindex`, está excluido del sitemap y no carga GTM.

## Controles de publicación

Se conserva la URL, el ID y la fecha original al actualizar un artículo. Una publicación nueva recibe un ID nuevo y la fecha de Colombia del momento de publicación. Los otros registros se conservan. El HTML pasa por una lista permitida en el servidor; se retiran scripts, eventos, formularios, iframes e imágenes incrustadas en el cuerpo.

Las imágenes de portada son rutas locales acotadas. Las tres portadas iniciales son ilustraciones generadas con IA y llevan una indicación visible al publicarse. La primera utiliza la referencia facial aportada por el propietario. El retrato original no se incluye en el repositorio.

No se permite publicar cambios que no se hayan guardado antes como borrador. Se requiere confirmar texto, fuentes e imagen. Un reintento de una publicación idéntica no añade otra entrada. Ante un conflicto o error del proveedor no se anuncia un envío completado.

## Entrega editorial del 2 de noviembre de 2026

Tres desarrollos de aproximadamente cinco minutos de lectura:

| Desarrollo | Operación | Ruta |
| --- | --- | --- |
| Alucinaciones en agentes de IA: cómo validar respuestas antes de enviarlas | Nueva publicación | `/blog/alucinaciones-agentes-ia-validar-respuestas/` |
| Memoria en agentes de IA: qué guardar y cuándo borrar información | Actualización, conserva URL | `/blog/memoria-agentes-ia-que-guardar/` |
| n8n 3.0 está en beta: qué revisar antes de migrar tus automatizaciones | Nueva publicación | `/blog/n8n-3-beta-preparar-migracion/` |

Estado comprobado el 2 de noviembre: **el propietario publicó las tres operaciones desde el panel**. GitHub registró los tres commits y Netlify completó sus despliegues. El blog tiene 28 artículos: dos publicaciones nuevas y la actualización de la guía existente. Los otros 25 registros se conservaron íntegros y no se eliminó ninguna URL.

La selección procede del correo del radar del 2 de noviembre aportado por el propietario. Su recepción a las 09:21 constituye evidencia aportada del envío programado del lunes; no se volvió a inspeccionar Gmail en esta tarea.

## Criterio editorial y fuentes

Se aplicó la orientación de [Google sobre contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): resolver una necesidad de la audiencia, aportar criterios propios, identificar la elaboración, enlazar fuentes y evitar resultados o experiencia inventados. No se persigue una extensión arbitraria ni se promete posicionamiento.

La guía de memoria amplía una URL existente para evitar otra página sobre la misma intención. Los ejemplos y matrices son propuestas para diseñar pruebas; no se presentan como trabajo ejecutado para un cliente.

Fuentes revisadas el 2 de noviembre:

- [Detección de alucinaciones de n8n](https://blog.n8n.io/hallucination-detection-methods-for-ai-agent-workflows/) y [Error Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.errortrigger/).
- [Estado y contexto](https://blog.n8n.io/stateful-vs-stateless/), [Simple Memory](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/) y [Postgres Chat Memory](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorypostgreschat/).
- [Anuncio de n8n 3.0 beta](https://blog.n8n.io/introducing-n8n-v3/), [cambios incompatibles](https://docs.n8n.io/changelog/v30-breaking-changes/) y [herramienta de migración](https://docs.n8n.io/changelog/v30-migration-tool/).

La condición beta se comprobó en el anuncio y la documentación. El calendario de versión estable anunciado por el fabricante es una previsión. Debe revisarse de nuevo al publicar o planificar una actualización real.

## Validación y operación pendiente

La suite incorpora pruebas de autorización, conservación del archivo, actualización de fechas, saneado, revisión obligatoria, concurrencia, reintentos, fallos del proveedor y exclusión de caché privada. La simulación local utiliza proveedores en memoria y no publica en GitHub ni en Netlify.

El propietario autorizó el 2 de noviembre la activación, la invitación y la credencial acotada. Identity está activado, el registro restringido a invitaciones y la confirmación de correo requerida. Se envió la invitación y se asignó el rol editorial-admin al propietario. La primera contraseña debe crearla el propietario.

La credencial «Edición Aular · panel editorial» se creó limitada al repositorio edisonabel/edicion-aular-astro, Contents lectura/escritura y Metadata lectura obligatoria; sin permisos de cuenta. Caduca el 31 de enero de 2027. Se comprobó su lectura del archivo del blog y su almacenamiento exacto como EDITORIAL_GITHUB_TOKEN en el contexto privado de producción de Netlify. La copia temporal se eliminó después de verificar. Antes de la caducidad se requiere renovar esa credencial sin ampliar su alcance.

El panel se desplegó en main. El acceso anónimo a la API se comprobó rechazado con HTTP 401. El propietario entró y publicó los tres contenidos entre las 14:57 y las 14:58 de Colombia; la última compilación quedó publicada a las 14:58:49. Las tres páginas públicas responden HTTP 200, tienen portadas distintas y aparecen en el listado de Todos los Artículos. La sección Destacados conserva su selección anterior; no equivale a las novedades del archivo.

La función se prepara con scripts/preparar-editorial.mjs antes de construir Astro. El bundle privado evita require(ESM), desactivado por AWS Lambda, y se prueba con esas restricciones. El entrypoint v2 de Netlify conserva rutas y autorización; no se activan flags experimentales globales ni se rebaja la versión del saneador HTML.

El cambio del botón del correo de `automations/google-apps-script/Code.gs` se sincronizó con Radar.gs del proyecto vivo de Apps Script. Se respaldó el código anterior y se comprobó que el guardado coincide exactamente con la copia local. verificarRadar terminó correctamente, consultó las cuatro fuentes y reconoció los 28 artículos publicados, sin avisos y sin enviar correo. El botón aparecerá en futuros informes que tengan novedades; no se modifican mensajes ya recibidos. Abre el estudio y nunca publica mediante un enlace GET.

No hay servicios de pago nuevos ni API de un modelo de IA en el panel. Identity y Blobs usan los recursos incluidos de Netlify; se mantienen los límites del plan gratuito, sin activar sobreconsumo o mejoras de plan.
