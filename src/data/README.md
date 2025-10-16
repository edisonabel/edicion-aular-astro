# 📁 Portfolio Data

## ¿Cómo agregar un nuevo proyecto al portfolio?

### Paso 1: Edita el archivo `portfolio.json`

Agrega un nuevo objeto al array con esta estructura:

```json
{
  "id": "nombre-unico",
  "title": "Nombre del Proyecto",
  "category": "Branding e Identidad Visual", 
  "description": "Descripción corta del proyecto",
  "image": "/img/portfolio/carpeta/imagen.webp",
  "slug": "nombre-url-amigable",
  "featured": true
}
```

### Paso 2: Sube las imágenes

Coloca las imágenes del proyecto en:
```
public/img/portfolio/nombre-proyecto/
```

### Paso 3: ¡Listo!

El proyecto aparecerá automáticamente en:
- ✅ Home (sección Portfolio)
- ✅ Página `/portfolio` (slider fullscreen)
- ✅ Página individual `/portfolio/nombre-proyecto`

---

## Campos disponibles:

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `id` | String | Identificador único | ✅ |
| `title` | String | Nombre del proyecto | ✅ |
| `category` | String | Categoría (Branding, Diseño Web, etc.) | ✅ |
| `description` | String | Descripción del proyecto | ✅ |
| `image` | String | Ruta de la imagen principal | ✅ |
| `slug` | String | URL amigable (sin espacios ni acentos) | ✅ |
| `featured` | Boolean | Mostrar en home (true/false) | ⚠️ |

---

## Categorías disponibles:

- `Branding e Identidad Visual`
- `Diseño Web`
- `Diseño Web Ecommerce`
- `Producción Audiovisual`
- `Meta & Google Ads`

---

## Ejemplo completo:

```json
{
  "id": "nuevo-proyecto",
  "title": "Mi Proyecto Increíble",
  "category": "Branding e Identidad Visual",
  "description": "Desarrollo completo de identidad visual para startup tecnológica.",
  "image": "/img/portfolio/nuevo-proyecto/portada.webp",
  "slug": "mi-proyecto-increible",
  "featured": true
}
```

---

**¡Solo edita el JSON y el resto se actualiza automáticamente!** 🎉
