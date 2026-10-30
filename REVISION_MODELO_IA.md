# Contexto para revisar el PR de IA, SEO y cobertura local

Este documento sustituye el informe inicial del commit f6656d4: las cifras, la dirección pendiente y la afirmación de retirada total que contenía no deben usarse como evidencia.

- [Revisión técnica final y límites de las pruebas](docs/REVISION_FINAL.md)
- [Mapa de secciones de las 21 páginas e inventario de los 30 HTML](docs/MAPA_SECCIONES_HTML.md)
- [Once prompts de imágenes y mapa de reutilización](docs/PROMPTS_IMAGENES.md)
- [Auditoría histórica con los hallazgos originales](AUDITORIA_CODEX.md)
- [Resultado automático del HTML compilado](docs/auditoria-html.json)
- [96 comprobaciones de tamaños y temas](docs/evidencias/verificacion-temas.json)

Para reproducir: ejecutar `npm run build` (63 páginas) y `npm run audit:geo` (21 páginas nuevas, 0 errores). Para revisar distribución: `npm run qa:preview` y abrir http://localhost:4322/__qa/.

La marca conserva su enfoque de soluciones a la medida y su identidad Bringer. Mentoría se retiró del catálogo. La capacitación práctica de equipos sigue disponible. Las imágenes editoriales se incorporarán después de generarlas con los prompts; mientras tanto hay tarjetas de diseño, sin imágenes grises de muestra.

Rama: `feat/ia-seo-geo-local`. PR: https://github.com/edisonabel/edicion-aular-astro/pull/1. El preview no modifica producción hasta fusionar.
