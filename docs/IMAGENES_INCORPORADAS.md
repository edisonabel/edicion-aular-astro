# Fotografías incorporadas

Diez archivos WebP entregados por el usuario cubren los once usos editoriales de las 21 páginas. Se copiaron sin modificar los originales: 1536 × 1024 px, entre 94 y 165 KiB por foto. Las imágenes ilustran situaciones de trabajo; no se presentan como clientes, personal o sedes reales de Edición Aular.

| Archivo web | Fotografía original | Uso | KiB |
| --- | --- | --- | --- |
| `agencia-ia.webp` | `collaborative-design-studio-meeting-6ae41a8981946.webp` | agencia | 111.2 |
| `agente-whatsapp.webp` | `focused-remote-work-in-a-modern-office-6ae41a896205d.webp` | canales | 98.3 |
| `automatizacion-procesos.webp` | `collaborative-creative-office-workspace-6ae41a88346f3.webp` | automatizacion | 114.8 |
| `contenido-ia.webp` | `creative-studio-product-shoot-6ae41a88056c9.webp` | contenido | 110.1 |
| `desarrollo-web.webp` | `espacio-creativo-con-codigo-y-montanas-6ae41a86e3ac8.webp` | web | 126.4 |
| `recepcion-clinica.webp` | `warm-dental-clinic-receptionist-6ae41a854a098.webp` | clinica | 93.5 |
| `negocios-medellin.webp` | `woman-writing-in-a-mountain-view-office-6ae41a86b6864.webp` | medellin | 100.8 |
| `recepcion-hotel.webp` | `modern-lobby-receptionist-multitasking-6ae41a8551e93.webp` | hotel | 121.8 |
| `diagnostico-procesos.webp` | `collaborative-creative-workspace-meeting-6ae41a83e29ec.webp` | diagnostico | 165.3 |
| `formacion-equipos.webp` | `collaborative-creative-workspace-planning-6ae41a83e54a4.webp` | formacion, inmobiliaria | 153.9 |

La foto de planificación se reutiliza en formación e inmobiliarias. El alt del sector inmobiliario describe el equipo y el mapa de procesos; no atribuye llaves, viviendas o una visita que no aparecen en la imagen.

Los nombres públicos se definen en `src/data/ia/imagenes.ts`. `EditorialImage.astro` reserva el espacio con CSS, usa las dimensiones intrínsecas reales y carga de forma diferida las imágenes secundarias. Las imágenes principales se cargan con prioridad alta. No hay texto incrustado sobre las fotografías.

El catálogo original de prompts se conserva como referencia para posibles reemplazos. Los SHA-256 y tamaños de los archivos incorporados están en `evidencias/imagenes-incorporadas.json`.

Verificación: compilación de 63 páginas, auditoría de las 21 páginas nuevas sin errores y 44 combinaciones de ruta, ancho y tema sin incidencias de distribución. Registro: `evidencias/verificacion-fotos.json`.
