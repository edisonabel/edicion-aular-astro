# 📝 Blog de Edición Aular - Guía de Uso

## ✅ Blog Implementado Exitosamente

Se ha creado un sistema de blog completo con el mismo estilo profesional del sitio web de Edición Aular.

---

## 📂 Archivos Creados

### 1. **Data de Posts**
- **Ubicación:** `src/data/blog.json`
- **Descripción:** Base de datos de artículos del blog en formato JSON
- **Posts incluidos:** 8 artículos sobre marketing digital, diseño web, branding, SEO, etc.

### 2. **Página Principal del Blog**
- **Ubicación:** `src/pages/blog.astro`
- **URL:** `/blog`
- **Características:**
  - Hero section con título y descripción
  - Sección de artículos destacados (featured)
  - Grid de todos los artículos
  - Filtros por categoría
  - Newsletter subscription
  - CTA para agendar consultoría

### 3. **Páginas de Detalle de Posts**
- **Ubicación:** `src/pages/blog/[slug].astro`
- **URL:** `/blog/[slug-del-articulo]`
- **Características:**
  - Breadcrumb de navegación
  - Imagen destacada
  - Contenido completo del artículo
  - Tags y categorías
  - Botones de compartir en redes sociales
  - Bio del autor
  - Artículos relacionados
  - CTA final

### 4. **Integración en el Menú**
- Enlace "Blog" agregado en header principal
- Enlace actualizado en footer (sección Recursos)

---

## 🎨 Características de Diseño

El blog mantiene el estilo profesional del sitio:

✅ **Sistema de colores** del tema (oscuro/claro)  
✅ **Tipografía Inter** con jerarquía clara  
✅ **Componentes "bringer"** consistentes  
✅ **Animaciones** (fade, zoom, stagger)  
✅ **Grid responsivo** para móvil y desktop  
✅ **SEO optimizado** con meta tags  
✅ **Lazy loading** de imágenes  

---

## 📝 Cómo Agregar Nuevos Posts

### Paso 1: Editar el archivo JSON
Abre `src/data/blog.json` y agrega un nuevo objeto al array:

```json
{
  "id": 9,
  "title": "Tu Título Aquí",
  "slug": "tu-titulo-aqui",
  "excerpt": "Descripción corta de 1-2 líneas",
  "content": "Contenido completo del artículo...",
  "image": "/img/blog/nombre-imagen.webp",
  "category": "Categoría",
  "author": "Edison Aular",
  "authorImage": "/img/team/edison.jpg",
  "date": "2025-01-20",
  "readTime": "8 min",
  "featured": false,
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Paso 2: Crear el slug
- El slug debe ser en minúsculas
- Sin espacios (usa guiones `-`)
- Sin acentos ni caracteres especiales
- Ejemplo: "Cómo Crear un Blog" → `"slug": "como-crear-un-blog"`

### Paso 3: Categorías disponibles
Puedes usar estas categorías existentes o crear nuevas:
- Marketing Digital
- Diseño Web
- Branding
- Publicidad Digital
- SEO
- Lanzamientos Digitales
- Producción Audiovisual
- Streaming

---

## 🖼️ Imágenes del Blog

### Ubicación de Imágenes
Todas las imágenes del blog deben estar en:
```
public/img/blog/
```

### Crear las Imágenes

**IMPORTANTE:** Actualmente las imágenes están referenciadas pero NO existen físicamente. Necesitas crear/agregar las siguientes imágenes:

```
public/img/blog/
  ├── marketing-digital-estrategia.webp
  ├── diseno-web-principios.webp
  ├── branding-identidad.webp
  ├── meta-vs-google.webp
  ├── seo-2025.webp
  ├── lanzamiento-digital.webp
  ├── video-marketing.webp
  └── streaming-profesional.webp
```

### Especificaciones Recomendadas:
- **Formato:** WebP (mejor compresión y calidad)
- **Dimensiones:** 1200x800px (ratio 3:2)
- **Peso:** Máximo 200KB
- **Calidad:** 80-85%

### Herramientas para Convertir a WebP:
- [Squoosh](https://squoosh.app/) (online, gratis)
- [CloudConvert](https://cloudconvert.com/) (online)
- Photoshop > Exportar como > WebP

---

## 🚀 Cómo Probar el Blog

### 1. Instalar dependencias (si no lo has hecho):
```bash
npm install
```

### 2. Iniciar servidor de desarrollo:
```bash
npm run dev
```

### 3. Visitar las páginas:
- Blog principal: `http://localhost:4321/blog`
- Post individual: `http://localhost:4321/blog/estrategia-marketing-digital-efectiva`

### 4. Build para producción:
```bash
npm run build
```

---

## 🎯 Próximos Pasos

### Acciones Inmediatas:
1. ✅ **Agregar imágenes** en `public/img/blog/`
2. ✅ **Reemplazar contenido** genérico por contenido real
3. ✅ **Configurar newsletter** (integrar servicio de email)
4. ✅ **Agregar foto del autor** en `public/img/team/edison.jpg`

### Mejoras Opcionales:
- [ ] Implementar paginación si tienes muchos posts
- [ ] Agregar buscador de artículos
- [ ] Implementar comentarios (Disqus, Utterances, etc.)
- [ ] Analytics para rastrear posts más leídos
- [ ] RSS feed para suscriptores

---

## 📊 Estructura de Datos del Post

```typescript
interface BlogPost {
  id: number;              // ID único
  title: string;           // Título del artículo
  slug: string;            // URL amigable
  excerpt: string;         // Resumen corto
  content: string;         // Contenido completo
  image: string;           // Ruta de imagen
  category: string;        // Categoría
  author: string;          // Nombre del autor
  authorImage: string;     // Foto del autor
  date: string;            // Fecha (YYYY-MM-DD)
  readTime: string;        // Tiempo de lectura
  featured: boolean;       // ¿Destacado?
  tags: string[];          // Array de tags
}
```

---

## 🔧 Personalización

### Cambiar Colores
Los colores se heredan del tema en `public/css/config.css`:
- `--bringer-s-accent`: Color principal (rosa #ff005f)
- `--bringer-s-text-accent`: Color de texto destacado (amarillo #ffbc1f)

### Modificar Layouts
- **Blog principal:** Edita `src/pages/blog.astro`
- **Post individual:** Edita `src/pages/blog/[slug].astro`

### Agregar Funcionalidades
El blog usa los mismos componentes y estilos del sitio principal, por lo que cualquier componente "bringer" está disponible.

---

## 📱 Responsividad

El blog es completamente responsive:
- **Desktop:** Grid de 3 columnas
- **Tablet:** Grid de 2 columnas
- **Mobile:** 1 columna

---

## ✨ Features Incluidos

✅ SEO optimizado con meta tags dinámicos  
✅ Open Graph para compartir en redes sociales  
✅ Breadcrumbs de navegación  
✅ Filtros por categoría con efecto isotope  
✅ Lazy loading de imágenes  
✅ Animaciones con data-appear  
✅ Tema claro/oscuro automático  
✅ Posts relacionados por categoría  
✅ Botones de compartir en redes  
✅ Tags y categorías  
✅ Bio del autor  
✅ Newsletter CTA  

---

## 🆘 Soporte

Si tienes alguna duda:
1. Revisa la documentación de [Astro](https://docs.astro.build)
2. Consulta los componentes existentes en el sitio
3. Mantén la estructura JSON consistente

---

**¡El blog está listo para usar! 🎉**

Solo necesitas agregar las imágenes y empezar a publicar contenido real.
