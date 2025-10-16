# 📦 Componente RecentPosts - Ejemplos de Uso

## 🎯 Componente Creado

Se ha creado un componente reutilizable **RecentPosts.astro** que muestra los últimos artículos del blog en cualquier página.

**Ubicación:** `src/components/RecentPosts.astro`

---

## 📖 Cómo Usarlo

### Ejemplo 1: En la Homepage

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import RecentPosts from '../components/RecentPosts.astro';
import portfolioData from '../data/portfolio.json';

const featuredProjects = portfolioData.filter(p => p.featured).slice(0, 5);
---

<BaseLayout>
    <div class="stg-container">
        <!-- Tu contenido existente... -->
        
        <!-- Sección de Servicios -->
        <section class="backlight-top">
            <!-- ... servicios ... -->
        </section>

        <!-- AGREGAR: Widget de Posts Recientes -->
        <section class="divider-top">
            <RecentPosts limit={3} title="Últimos del Blog" />
        </section>

        <!-- Sección CTA -->
        <section class="divider-top">
            <!-- ... CTA ... -->
        </section>
    </div>
</BaseLayout>
```

---

### Ejemplo 2: En la Página "Nosotros"

```astro
---
// src/pages/nosotros.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import RecentPosts from '../components/RecentPosts.astro';
---

<BaseLayout title="Sobre Nosotros | Edición Aular">
    <div class="stg-container">
        <!-- Contenido sobre nosotros... -->
        
        <section>
            <h2>Nuestro Equipo</h2>
            <!-- ... equipo ... -->
        </section>

        <!-- Widget de Posts -->
        <section class="divider-top backlight-top">
            <RecentPosts 
                limit={4} 
                title="Recursos y Guías" 
            />
        </section>
    </div>
</BaseLayout>
```

---

### Ejemplo 3: En Páginas de Servicios

```astro
---
// src/pages/diseno-web.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import RecentPosts from '../components/RecentPosts.astro';
---

<BaseLayout title="Diseño Web | Edición Aular">
    <div class="stg-container">
        <!-- Contenido del servicio... -->
        
        <section>
            <h2>Nuestro Proceso de Diseño</h2>
            <!-- ... proceso ... -->
        </section>

        <!-- Posts relacionados con diseño web -->
        <section class="divider-top">
            <RecentPosts 
                limit={3} 
                title="Artículos sobre Diseño Web" 
            />
        </section>
    </div>
</BaseLayout>
```

---

### Ejemplo 4: En el Footer (Sidebar Widget)

```astro
---
// src/layouts/BaseLayout.astro (dentro del footer)
import RecentPosts from '../components/RecentPosts.astro';
---

<footer id="bringer-footer">
    <div class="bringer-footer-widgets">
        <div class="stg-container">
            <div class="stg-row">
                <div class="stg-col-5">
                    <!-- Info de la empresa -->
                </div>

                <div class="stg-col-3">
                    <!-- AGREGAR: Posts Recientes en Footer -->
                    <div class="bringer-widget">
                        <h6>Del Blog</h6>
                        <RecentPosts limit={3} title="" />
                    </div>
                </div>

                <div class="stg-col-2">
                    <!-- Menú -->
                </div>
            </div>
        </div>
    </div>
</footer>
```

---

## ⚙️ Props Disponibles

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `limit` | number | `3` | Número de posts a mostrar |
| `title` | string | `"Últimos Artículos del Blog"` | Título de la sección |

### Ejemplos de Uso:

```astro
<!-- Mostrar solo 2 posts -->
<RecentPosts limit={2} />

<!-- Cambiar el título -->
<RecentPosts title="Artículos Destacados" />

<!-- Combinar props -->
<RecentPosts limit={5} title="Todo el Contenido" />

<!-- Sin título (título vacío) -->
<RecentPosts limit={3} title="" />
```

---

## 🎨 Personalización de Estilos

El componente ya tiene estilos incluidos, pero puedes personalizarlos:

### Opción 1: Modificar el Componente Directamente

Edita `src/components/RecentPosts.astro` en la sección `<style>`.

### Opción 2: CSS Global

Agrega estilos en `public/css/style.css`:

```css
/* Personalizar el widget de posts recientes */
.bringer-recent-posts-widget {
    background: var(--bringer-s-container-bg);
    padding: 3rem 2rem;
    border-radius: var(--bringer-default-br);
}

.bringer-post-item {
    /* Tus estilos personalizados */
}
```

### Opción 3: Estilos Inline

```astro
<div style="background: #1A1D24; padding: 2rem;">
    <RecentPosts limit={3} />
</div>
```

---

## 🔄 Variaciones del Componente

### Variación 1: Grid en lugar de Lista

Modifica `RecentPosts.astro`:

```astro
<div class="bringer-posts-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
    {recentPosts.map((post) => (
        <!-- ... -->
    ))}
</div>
```

### Variación 2: Solo Posts Destacados

```astro
---
const recentPosts = blogData
    .filter(post => post.featured)  // ← Solo featured
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
---
```

### Variación 3: Por Categoría Específica

```astro
---
const { category = null } = Astro.props;

let posts = blogData;
if (category) {
    posts = posts.filter(p => p.category === category);
}

const recentPosts = posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
---

<!-- Uso: -->
<RecentPosts category="Marketing Digital" limit={3} />
```

---

## 📱 Responsive

El componente es responsive por defecto:

- **Desktop:** Imagen a la izquierda, contenido a la derecha
- **Mobile (<768px):** Imagen arriba, contenido abajo

---

## ✨ Mejoras Sugeridas

### 1. Agregar Excerpt

```astro
<div class="bringer-post-item-content">
    <h5>{post.title}</h5>
    <p class="bringer-post-excerpt">{post.excerpt}</p>  ← Nuevo
    <p class="bringer-meta">{post.date} • {post.readTime}</p>
</div>
```

### 2. Agregar Tags

```astro
<div class="bringer-post-tags">
    {post.tags.slice(0, 2).map(tag => (
        <span class="bringer-tag">#{tag}</span>
    ))}
</div>
```

### 3. Agregar Avatar del Autor

```astro
<div class="bringer-post-author">
    <img src={post.authorImage} alt={post.author} />
    <span>{post.author}</span>
</div>
```

---

## 🚀 Ejemplo Completo: Homepage Actualizada

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import RecentPosts from '../components/RecentPosts.astro';
import portfolioData from '../data/portfolio.json';

const featuredProjects = portfolioData.filter(p => p.featured).slice(0, 5);
---

<BaseLayout>
    <div class="stg-container">
        <!-- Hero Section -->
        <section>
            <!-- ... hero content ... -->
        </section>

        <!-- About Section -->
        <section class="backlight-top">
            <!-- ... about content ... -->
        </section>

        <!-- Portfolio Section -->
        <section class="is-fullwidth is-stretched">
            <!-- ... portfolio carousel ... -->
        </section>

        <!-- NUEVO: Blog Widget -->
        <section class="backlight-top">
            <div class="stg-row bringer-section-title">
                <div class="stg-col-8 stg-offset-2 align-center">
                    <h2 data-appear="fade-up">Aprende con Nosotros</h2>
                    <p class="bringer-large-text" data-appear="fade-up" data-delay="100">
                        Contenido exclusivo sobre marketing, diseño y branding
                    </p>
                </div>
            </div>
            <RecentPosts limit={3} title="" />
        </section>

        <!-- Services Section -->
        <section class="backlight-top">
            <!-- ... services ... -->
        </section>

        <!-- CTA Section -->
        <section class="divider-top">
            <!-- ... CTA ... -->
        </section>
    </div>
</BaseLayout>
```

---

## 📊 Casos de Uso Recomendados

| Página | Ubicación | Limit | Título Sugerido |
|--------|-----------|-------|-----------------|
| Homepage | Después de Portfolio | 3 | "Últimos del Blog" |
| Nosotros | Al final | 4 | "Recursos y Guías" |
| Servicios | Después de Features | 3 | "Artículos Relacionados" |
| Portafolio | Al final | 3 | "Aprende Más" |
| Contacto | Sidebar | 2 | "Lectura Recomendada" |
| Footer | Widget Sidebar | 3 | "Del Blog" |

---

## ✅ Checklist de Implementación

- [ ] Importar el componente en la página deseada
- [ ] Definir `limit` y `title` apropiados
- [ ] Ubicar en una sección con `divider-top` o `backlight-top`
- [ ] Probar en mobile y desktop
- [ ] Verificar animaciones
- [ ] Asegurar que las imágenes cargan

---

**¡Usa este componente para aumentar el engagement y mantener a los usuarios explorando tu contenido! 🚀**
