# Redactar solicitudes del panel privado

El propietario eligió el 5/11/2026 **redactar los artículos en este chat**, sin conectar Gemini ni otra API de generación. El botón del panel solicita redacción; no dispara un modelo ni anuncia falsamente un artículo generado.

## Recorrido del usuario

1. En Sugerencias pulsa **Solicitar redacción**. El panel guarda la solicitud privada y muestra confirmación.
2. Escribe **«redacta mis solicitudes»** en este chat. No hace falta copiar fichas.
3. El asistente recoge las solicitudes, consulta fuentes primarias, redacta el artículo completo y prepara una portada pertinente.
4. El artículo queda en **Pendientes** y su sugerencia muestra **Revisar artículo**.
5. El propietario lee la vista previa, puede guardar cambios y marca **Aprobar artículo** y **Aprobar imagen** por separado. La segunda opción solo se habilita cuando carga la portada. Luego pulsa **Revisar y publicar**, confirma las fuentes y publica. Cambiar de artículo, recargar o editar reinicia las aprobaciones de esa revisión; no son una aprobación persistente. Se conserva el archivo público anterior.

## Entrega editorial acordada el 9/11/2026

Entregar artículos completos contrastados, con portada distinta, listos para revisión privada. Las fichas del radar son propuestas, no la entrega terminada. El propietario redacta con el asistente en este chat; no hay un modelo conectado al botón ni generación autónoma contratada. Al atender solicitudes, completar texto e imagen, no devolver otra ficha para desarrollar.

Selección por tanda: **1–2 artículos de IA general y 3–4 del nicho de clínicas, consultorios y centros de estética**. Conservar las sugerencias generales. Distinguir anuncios oficiales de tendencias de búsqueda medidas; no atribuir volumen a Google Trends sin evidencia. No forzar aplicaciones clínicas a un anuncio de investigación. Las dos solicitudes del 9/11 son la parte general de la tanda, no una tanda completa del nicho.

## Preparación desde este repositorio

Usar la sesión existente de Netlify CLI. No crear ni exponer credenciales nuevas.

```powershell
node scripts/editorial-workspace.mjs export
```

El archivo `.netlify/editorial-workspace/snapshot.json` está ignorado por Git y contiene `suggestions`, `requests`, `drafts` y `revision`. Las solicitudes pendientes de redacción son aquellas cuyo `key` todavía no aparece como `sourceKey` en los borradores. No volver a redactar piezas ya preparadas salvo petición explícita de actualización.

Para cada pieza, desarrollar el enfoque con investigación primaria y aportación útil propia. Comprobar solapamiento con `src/data/blog.json`, fechas, enlaces, cifras atribuidas y ejemplos hipotéticos. Mantener la marca, no repetir portadas ni usar el rostro de Edison: el propietario pidió **personas distintas, no él** el 5/11/2026. No copiar las plantillas del radar como artículo terminado.

Preparar un JSON privado con una lista de registros válidos: `{key, sourceKey?, kind, targetSlug?, sources, post}`. Si parte del radar, `sourceKey` corresponde exactamente a una sugerencia. Si el propietario lo encargó directamente en el chat, omitir `sourceKey`: no crear una ficha ficticia ni marcar el encargo como tendencia. El artículo aparecerá directamente en Pendientes. El artículo necesita título, resumen, HTML saneable, URL, portada local existente, descripción de imagen y etiquetas. Guardar las portadas en `public/img/blog/`; no guardar el JSON de borradores ni su texto en el repositorio público.

```powershell
node scripts/editorial-workspace.mjs import C:/RUTA_PRIVADA/articulos.json
```

La importación valida textos, fuentes, asociaciones y portadas, conserva las otras piezas y realiza un guardado condicionado por ETag. Si el propietario editó mientras se preparaban los artículos, se detiene y exige exportar y comparar de nuevo. Hace copia privada antes de guardar y verifica el resultado después. **No publica ni escribe en GitHub**; la aprobación sigue en el panel.

Para una actualización explícita conservar URL, ID y fecha del artículo; no sustituir una guía existente por una noticia tangencial. La nueva imagen puede necesitar primero un despliegue para que aparezca en el panel de producción.
