# Redactar solicitudes del panel privado

El propietario eligió el 5/11/2026 **redactar los artículos en este chat**, sin conectar Gemini ni otra API de generación. El botón del panel solicita redacción; no dispara un modelo ni anuncia falsamente un artículo generado.

## Recorrido del usuario

1. En Sugerencias pulsa **Solicitar redacción**. El panel guarda la solicitud privada y muestra confirmación.
2. Escribe **«redacta mis solicitudes»** en este chat. No hace falta copiar fichas.
3. El asistente recoge las solicitudes, consulta fuentes primarias, redacta el artículo completo y prepara una portada pertinente.
4. El artículo queda en **Pendientes** y su sugerencia muestra **Revisar artículo**.
5. El propietario lee la vista previa, puede guardar cambios y pulsa **Revisar y publicar**. Confirma fuentes, texto e imagen antes de aprobar. Se conserva el archivo público anterior.

## Preparación desde este repositorio

Usar la sesión existente de Netlify CLI. No crear ni exponer credenciales nuevas.

```powershell
node scripts/editorial-workspace.mjs export
```

El archivo `.netlify/editorial-workspace/snapshot.json` está ignorado por Git y contiene `suggestions`, `requests`, `drafts` y `revision`. Las solicitudes pendientes de redacción son aquellas cuyo `key` todavía no aparece como `sourceKey` en los borradores. No volver a redactar piezas ya preparadas salvo petición explícita de actualización.

Para cada pieza, desarrollar el enfoque con investigación primaria y aportación útil propia. Comprobar solapamiento con `src/data/blog.json`, fechas, enlaces, cifras atribuidas y ejemplos hipotéticos. Mantener la marca, no repetir portadas ni usar el rostro de Edison: el propietario pidió **personas distintas, no él** el 5/11/2026. No copiar las plantillas del radar como artículo terminado.

Preparar un JSON privado con una lista de registros válidos: `{key, sourceKey, kind, targetSlug?, sources, post}`. `sourceKey` corresponde exactamente a una sugerencia. El artículo necesita título, resumen, HTML saneable, URL, portada local existente, descripción de imagen y etiquetas. Guardar las portadas en `public/img/blog/`; no guardar el JSON de borradores ni su texto en el repositorio público.

```powershell
node scripts/editorial-workspace.mjs import C:/RUTA_PRIVADA/articulos.json
```

La importación valida textos, fuentes, asociaciones y portadas, conserva las otras piezas y realiza un guardado condicionado por ETag. Si el propietario editó mientras se preparaban los artículos, se detiene y exige exportar y comparar de nuevo. Hace copia privada antes de guardar y verifica el resultado después. **No publica ni escribe en GitHub**; la aprobación sigue en el panel.

Para una actualización explícita conservar URL, ID y fecha del artículo; no sustituir una guía existente por una noticia tangencial. La nueva imagen puede necesitar primero un despliegue para que aparezca en el panel de producción.
