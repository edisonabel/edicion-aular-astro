# Recuperación del diseño y portadas del blog

Fecha: 30 de octubre de 2026, America/Bogota.

La comparación con abc1531 encontró 19 artículos anteriores. Ninguna de sus rutas desapareció: el catálogo actual contiene esas 19 rutas y cinco publicaciones nuevas (24 en total). Las actualizaciones editoriales previas modificaron títulos y cuerpos; esta corrección conserva íntegros esos textos revisados, sus fechas, etiquetas y slugs.

Las 19 portadas originales seguían disponibles en public/img/blog. Se recuperan sus rutas y dimensiones reales. Los cinco artículos nuevos mantienen imágenes distintas entre sí; el resultado son 24 portadas distintas, comprobadas también por hash de archivo. Una misma tarjeta puede aparecer en Destacados y en el archivo, como en el diseño previo: no se utiliza esa portada para otro artículo.

Se recupera la presentación anterior de la cabecera centrada, buscador redondo, tarjetas con imagen interior y distintivo de categoría, secciones de Destacados y Todos los Artículos y cierre bento. El interior recupera la columna de lectura de la plantilla, resumen, cierre centrado, barra de progreso y carrusel de relacionados. Se mantienen el marcado BlogPosting, las migas, RSS, búsqueda sin acentos y filtro por categorías. El bloque que antes mostraba un formulario de suscripción sin envío ahora lleva al RSS, con el mismo tratamiento de tarjeta centrada.

Se recuperan los indicadores de destacado de los artículos antiguos y se conservan los de los nuevos. El enlace «Ver los 24 artículos» lleva directamente al archivo. Los títulos y etiquetas históricos se añaden únicamente como aliases de búsqueda para que se puedan localizar artículos con los nombres anteriores.

El amarillo procedía de --bringer-s-text-accent: #ffbc1f en config.css. Se sustituye por rosado legible sobre oscuro y por un rosado más oscuro sobre claro. Las categorías, filtros, enlaces y estados de foco del blog siguen esa paleta. No se cambian logotipos ni se recolorean las portadas.

No se restauran afirmaciones genéricas sin evidencia que la antigua plantilla añadía al pie de todos los artículos, ni formularios sin un destino de envío.

## Criterio editorial confirmado por el usuario

El nuevo enfoque de IA se aplica a los artículos nuevos. Se conserva el archivo de marketing, ventas, diseño y marca: sus 19 rutas, sus temas y sus portadas. No borrar ni sustituir artículos históricos por contenidos nuevos, ni rediseñar de nuevo el blog sin una petición expresa. Si un artículo antiguo necesita correcciones, hacer cambios puntuales y mantener su identidad; no convertirlo automáticamente en una guía genérica de IA. El índice identifica 19 artículos del archivo y cinco publicaciones nuevas.

## Verificación

Los 24 cuerpos, títulos, fechas y etiquetas revisados al inicio de esta corrección se conservaron sin cambios. Se comprobó la presencia de las 19 rutas históricas y la existencia de 24 portadas con hashes distintos. Build: 68 páginas, RSS con 24 artículos, 15 pruebas y auditores HTML/GEO sin errores. Búsqueda «Hormozi»: tres artículos; filtro «Webinars y Ventas»: uno; restablecer Todos: 24. Se revisaron 18 vistas del índice y dos artículos a 390/768/1200 px y claro/oscuro, sin fallos de contraste medidos. El visor señala las diapositivas que el carrusel mantiene fuera de pantalla; la comprobación nativa confirmó que su contenedor las recorta con overflow:hidden.
