# 🖼️ Guía para Crear Imágenes del Blog

## Opción 1: Usar Placeholders Temporales

Mientras creas las imágenes finales, puedes usar servicios de placeholders:

### Unsplash Source (Imágenes reales)
```
https://source.unsplash.com/1200x800/?marketing,digital
https://source.unsplash.com/1200x800/?web,design
https://source.unsplash.com/1200x800/?branding
https://source.unsplash.com/1200x800/?advertising
https://source.unsplash.com/1200x800/?seo
https://source.unsplash.com/1200x800/?product,launch
https://source.unsplash.com/1200x800/?video,production
https://source.unsplash.com/1200x800/?streaming
```

### Placeholder.com (Imágenes genéricas)
```
https://via.placeholder.com/1200x800/FF005F/FFFFFF?text=Marketing+Digital
https://via.placeholder.com/1200x800/FF005F/FFFFFF?text=Diseño+Web
```

---

## Opción 2: Crear Imágenes con Canva

1. Ve a [Canva.com](https://www.canva.com)
2. Crea un diseño personalizado de **1200x800px**
3. Usa el template "Blog Banner" o "Social Media Post"
4. Aplica los colores de marca:
   - Rosa: `#FF005F`
   - Amarillo: `#FFBC1F`
   - Oscuro: `#07090D`
   - Claro: `#F5F7FA`

5. Descarga como **PNG de alta calidad**
6. Convierte a WebP usando [Squoosh](https://squoosh.app)

---

## Opción 3: Usar Figma

1. Crea un frame de 1200x800px
2. Diseña con tu identidad de marca
3. Exporta como PNG @2x
4. Convierte a WebP

---

## Opción 4: IA Generativa

Usa herramientas de IA para generar imágenes:

### DALL-E / Midjourney
Prompts sugeridos:

```
"Modern minimalist banner for marketing digital blog, pink and yellow accent colors, dark background, professional, clean design, 3:2 ratio"

"Web design banner illustration, modern ui elements, gradient background with pink #FF005F and yellow #FFBC1F, professional, minimalist"

"Branding identity banner, modern brand elements, logo mockup, pink and yellow color scheme, dark background, professional photography style"

"Digital advertising banner, meta and google ads icons, modern interface, pink accent color, dark mode design"

"SEO optimization banner, search engine graphics, modern digital marketing, pink and yellow accents, professional design"

"Product launch banner, digital product mockup, modern e-commerce, gradient background, pink accent color"

"Video production banner, camera equipment, modern filming setup, cinematic lighting, pink and yellow accents"

"Live streaming setup banner, professional broadcasting equipment, modern studio, pink accent lighting"
```

---

## Opción 5: Crear con CSS (Fondos Gradiente)

Si no tienes imágenes, puedes usar fondos CSS temporales:

```css
.blog-placeholder-1 {
  background: linear-gradient(135deg, #FF005F 0%, #FFBC1F 100%);
}

.blog-placeholder-2 {
  background: linear-gradient(135deg, #07090D 0%, #FF005F 100%);
}

.blog-placeholder-3 {
  background: linear-gradient(135deg, #FFBC1F 0%, #FF005F 100%);
}
```

---

## 📦 Imágenes Necesarias

Crea estos 8 archivos en `public/img/blog/`:

1. **marketing-digital-estrategia.webp**
   - Tema: Estrategia de marketing, gráficos, análisis
   - Colores: Rosa/Amarillo sobre oscuro

2. **diseno-web-principios.webp**
   - Tema: Diseño web, UI/UX, wireframes
   - Colores: Elementos de UI modernos

3. **branding-identidad.webp**
   - Tema: Logos, identidad visual, colores
   - Colores: Paleta de colores, mockups

4. **meta-vs-google.webp**
   - Tema: Logos Meta y Google, publicidad
   - Colores: Azul Meta + colores Google

5. **seo-2025.webp**
   - Tema: Search engines, rankings, gráficos
   - Colores: Verde (SEO) + rosa

6. **lanzamiento-digital.webp**
   - Tema: Producto digital, laptop, cohete
   - Colores: Gradiente dinámico

7. **video-marketing.webp**
   - Tema: Cámara, video, producción
   - Colores: Cinematográfico, rosa accent

8. **streaming-profesional.webp**
   - Tema: Setup streaming, luces, equipos
   - Colores: Luces profesionales, rosa/morado

---

## 🎨 Especificaciones Técnicas

- **Formato:** WebP (mejor compresión)
- **Dimensiones:** 1200x800px (ratio 3:2)
- **Peso máximo:** 200KB
- **Calidad:** 80-85%
- **Colores:** Usar paleta de marca

---

## 🔄 Convertir PNG/JPG a WebP

### Usando Squoosh (Recomendado):
1. Ve a [squoosh.app](https://squoosh.app)
2. Arrastra tu imagen
3. Selecciona "WebP" en el panel derecho
4. Ajusta calidad a 80-85
5. Descarga

### Usando Terminal (Mac/Linux):
```bash
# Instalar cwebp
brew install webp

# Convertir imagen
cwebp -q 85 input.png -o output.webp
```

### Usando Terminal (Windows):
```powershell
# Descargar cwebp.exe desde developers.google.com/speed/webp
cwebp.exe -q 85 input.png -o output.webp
```

---

## ✅ Checklist

- [ ] Crear/obtener 8 imágenes para posts
- [ ] Convertir a formato WebP
- [ ] Optimizar peso (máx 200KB)
- [ ] Guardar en `public/img/blog/`
- [ ] Verificar nombres coinciden con blog.json
- [ ] Crear foto del autor `public/img/team/edison.jpg`
- [ ] Probar en navegador

---

## 🎁 Bonus: Bancos de Imágenes Gratuitos

- [Unsplash](https://unsplash.com) - Fotos gratuitas de alta calidad
- [Pexels](https://pexels.com) - Stock photos y videos
- [Freepik](https://freepik.com) - Vectores e ilustraciones
- [unDraw](https://undraw.co) - Ilustraciones SVG personalizables
- [Humaaans](https://humaaans.com) - Ilustraciones de personas

---

**¡Usa estas guías para crear imágenes profesionales para tu blog! 🎨**
