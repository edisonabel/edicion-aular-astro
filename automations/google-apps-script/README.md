# Radar de Google Apps Script

La copia de código está en Code.gs. El proyecto privado autorizado usa Radar.gs y no se publica como aplicación web. Dos activadores ejecutan ejecutarRadar los lunes y jueves de 09:00 a 10:00 de America/Bogota.

- verificarRadar: comprueba fuentes y candidatos, sin enviar.
- enviarPrimerInforme: prueba inicial manual con un correo; no usar como activador periódico.
- ejecutarRadar: revisión ordinaria, silenciosa si no hay novedades.
- instalarRadar: instala/reemplaza solo los dos activadores de este radar dentro del proyecto.

Los permisos son conexión a servicios externos, envío de correo y ejecución programada. No requiere lectura de Gmail, Drive ni datos de visitantes. No necesita claves ni facturación.

Las propiedades RADAR_STATE y RADAR_PENDING son privadas. Si hay un envío pendiente, comprobar el buzón antes de reintentar. No publicar las propiedades del proyecto en Git. Mantener el radar local de Codex en pausa mientras los activadores de Google estén activos.

Para modificar el código, guardar la versión revisada en Google y ejecutar verificarRadar antes de cualquier envío de prueba. La copia local no sincroniza cambios por sí sola. Consultar docs/RADAR_EDITORIAL_IA.md para alcance, fuentes y límites.
