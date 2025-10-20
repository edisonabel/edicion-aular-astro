# 📝 CÓMO EDITAR LOS BLOGS - Guía Simple

## 🎯 Lo Más Importante

**SOLO necesitas editar UN archivo**: `/src/data/blog.json`

Es un archivo de texto simple que contiene todos los blogs.

---

## 📂 ESTRUCTURA DE UN BLOG

Cada blog tiene esta estructura:

```json
{
  "id": 1,
  "title": "El Título de Tu Blog",
  "slug": "nombre-para-url",
  "excerpt": "El resumen que aparece en las tarjetas y en Google",
  "content": "Todo el contenido del blog va aquí en un solo párrafo largo. El sistema lo divide automáticamente.",
  "image": "/img/blog/nombre-de-la-imagen.webp",
  "category": "Marketing Digital",
  "author": "Edison Aular",
  "authorImage": "/img/team/edison.jpg",
  "date": "2025-01-20",
  "readTime": "12 min",
  "featured": true,
  "tags": ["tag1", "tag2", "tag3"]
}
```

---

## ✏️ CÓMO EDITAR UN BLOG

### 1. Abre el archivo:
```
/src/data/blog.json
```

### 2. Busca el blog que quieres editar por su `title` o `id`

### 3. Edita los campos que necesites:

#### **Cambiar el título:**
```json
"title": "Tu Nuevo Título Aquí"
```

#### **Cambiar el contenido:**
```json
"content": "Escribe todo el contenido aquí. Puedes hacerlo tan largo como quieras. El sistema automáticamente lo dividirá en párrafos de 3 oraciones cada uno para que sea más legible."
```

💡 **TRUCO**: Escribe oraciones completas terminadas en punto (.). El sistema cuenta los puntos para dividir en párrafos.

#### **Cambiar la imagen:**
1. Sube tu imagen a `/public/img/blog/`
2. Actualiza la ruta:
```json
"image": "/img/blog/tu-nueva-imagen.webp"
```

#### **Cambiar categoría:**
```json
"category": "SEO", 
// O: "Marketing Digital", "Copywriting", "Ventas", etc.
```

#### **Cambiar fecha:**
```json
"date": "2025-01-25"
// Formato: YYYY-MM-DD
```

#### **Hacer que aparezca destacado:**
```json
"featured": true   // Aparece en home
"featured": false  // Solo en /blog
```

---

## 🆕 CÓMO CREAR UN BLOG NUEVO

### Paso 1: Copia esta plantilla

```json
{
  "id": 12,
  "title": "Tu Título Increíble Aquí",
  "slug": "tu-titulo-increible-aqui",
  "excerpt": "Un resumen de 150-160 caracteres que explique de qué trata el blog y enganche al lector",
  "content": "Aquí va todo tu contenido. Explica paso a paso el concepto. Usa oraciones cortas. Habla como si le explicaras a un amigo que no sabe nada del tema. Ejemplo: imagina que Russell Brunson es un chef. Su secreto no es inventar recetas nuevas, es perfeccionar una receta probada y repetirla mil veces hasta que sea perfecta. Lo mismo pasa con los embudos de venta: no necesitas reinventar la rueda, necesitas dominar un sistema que ya funciona. Primero, identifica qué vende tu audiencia objetivo. Segundo, crea una oferta irresistible que resuelva ese problema específico. Tercero, construye un embudo simple que lleve de A a B sin distracciones. El error más grande de los emprendedores es complicar demasiado. Mantén tu embudo simple, tu mensaje claro, y tu oferta irresistible.",
  "image": "/img/blog/tu-imagen.webp",
  "category": "Estrategia",
  "author": "Edison Aular",
  "authorImage": "/img/team/edison.jpg",
  "date": "2025-01-25",
  "readTime": "10 min",
  "featured": false,
  "tags": ["marketing", "ventas", "estrategia"]
}
```

### Paso 2: Pégala AL FINAL del archivo blog.json

**IMPORTANTE**: Agrega una coma `,` después del último blog existente, luego pega el nuevo blog.

```json
  },  <-- Esta coma es CRÍTICA
  {
    "id": 12,
    ...tu nuevo blog
  }
]
```

### Paso 3: Guarda el archivo

### Paso 4: Haz commit y push

```bash
git add .
git commit -m "Nuevo blog agregado"
git push
```

---

## 🖼️ CÓMO AGREGAR IMÁGENES

### Opción 1: Imágenes individuales (como las de Hormozi que ya subiste)

1. **Sube tu imagen** a:
   ```
   /public/img/blog/
   ```

2. **Nómbrala descriptivamente**:
   ```
   Oferta Irresistible.webp
   Stack de Valor.webp
   Russell Brunson Sales Funnel.webp
   ```

3. **Úsala en tu blog**:
   ```json
   "image": "/img/blog/Oferta Irresistible.webp"
   ```

### Opción 2: Imágenes por carpeta (para blogs con múltiples imágenes)

1. **Crea una carpeta**:
   ```
   /public/img/blog/mi-blog-sobre-seo/
   ```

2. **Sube tus imágenes**:
   ```
   /public/img/blog/mi-blog-sobre-seo/portada.webp
   /public/img/blog/mi-blog-sobre-seo/grafico-1.webp
   ```

3. **Úsalas**:
   ```json
   "image": "/img/blog/mi-blog-sobre-seo/portada.webp"
   ```

---

## 💡 TIPS PARA ESCRIBIR CONTENIDO COMO EXPERTO

### 1. **Usa Analogías Simples**
❌ Mal: "La arquitectura de información debe optimizar el flujo de conversión"
✅ Bien: "Piensa en tu embudo como un tobogán: mientras más suave y directo, más gente llega al final"

### 2. **Explica Términos Técnicos**
❌ Mal: "El CTA debe tener high contrast ratio"
✅ Bien: "Tu botón de acción (CTA) debe destacarse como un semáforo en rojo"

### 3. **Usa Ejemplos Reales**
❌ Mal: "Aumenta el valor percibido"
✅ Bien: "En vez de vender 'Consultoría de Marketing ($1000)', vende 'Sistema Completo de 10 Clientes en 30 Días: Consultoría + Plantillas + Soporte ($1000)'"

### 4. **Oraciones Cortas**
- Máximo 25 palabras por oración
- Una idea por oración
- Usa puntos, no comas infinitas

### 5. **Habla Directo**
❌ Mal: "Se podría argumentar que los embudos de venta representan..."
✅ Bien: "Los embudos de venta son tu máquina de ventas automatizada. Punto."

---

## 🎨 TAMAÑOS RECOMENDADOS PARA IMÁGENES

| Tipo | Tamaño | Uso |
|------|--------|-----|
| **Portada del blog** | 1200x630px | Aparece en redes sociales |
| **Imágenes internas** | Max 1920px ancho | Dentro del contenido |
| **Thumbnails** | 400x300px | Listado de blogs |

**Formato recomendado**: `.webp` (más ligero que JPG)

---

## 🚀 CHECKLIST ANTES DE PUBLICAR

- [ ] El `title` es atractivo y claro
- [ ] El `slug` no tiene espacios (usa guiones: `mi-blog-increible`)
- [ ] El `excerpt` tiene 150-160 caracteres
- [ ] El `content` está completo y bien escrito
- [ ] La `image` existe en `/public/img/blog/`
- [ ] El `id` es único (no repites un número)
- [ ] La `date` está en formato `YYYY-MM-DD`
- [ ] Los `tags` son relevantes (4-6 tags max)
- [ ] El JSON no tiene errores de sintaxis (comas, llaves)

---

## ⚠️ ERRORES COMUNES Y CÓMO EVITARLOS

### 1. **Olvidar la coma entre blogs**
❌ Error:
```json
  }
  {
```

✅ Correcto:
```json
  },
  {
```

### 2. **Comillas dentro del contenido**
❌ Error:
```json
"content": "El "secreto" está aquí"
```

✅ Correcto (escapa las comillas):
```json
"content": "El \"secreto\" está aquí"
```

O mejor, usa comillas simples:
```json
"content": "El 'secreto' está aquí"
```

### 3. **Ruta de imagen incorrecta**
❌ Error:
```json
"image": "img/blog/mi-imagen.webp"  // falta el /
```

✅ Correcto:
```json
"image": "/img/blog/mi-imagen.webp"  // con /
```

### 4. **ID duplicado**
❌ Error: Dos blogs con `"id": 5`
✅ Correcto: Cada blog tiene un ID único

---

## 🔍 CÓMO VERIFICAR QUE FUNCIONA

1. **Guarda** el archivo `blog.json`
2. **Haz commit**:
   ```bash
   git add .
   git commit -m "Actualizado blog X"
   git push
   ```
3. **Espera 2-3 minutos** que Netlify despliegue
4. **Visita**: `https://edicionaular.com/blog`
5. **Encuentra tu blog** y haz clic
6. **Verifica**:
   - ✅ Aparece la imagen
   - ✅ El título es correcto
   - ✅ El contenido se ve bien separado en párrafos
   - ✅ La fecha y autor son correctos

---

## 🆘 SI ALGO SALE MAL

1. **Verifica errores de sintaxis** en blog.json:
   - Usa un validador JSON online: https://jsonlint.com/
   - Pega todo el contenido de blog.json
   - Te dirá exactamente dónde está el error

2. **Revisa la consola del navegador** (F12):
   - Busca errores en rojo
   - Copia el error y búscalo en Google

3. **Revuelca los cambios**:
   ```bash
   git reset HEAD~1
   git push --force
   ```

---

## 📞 CONTACTO

Si tienes dudas o algo no funciona, contacta a Edison Aular.

---

**Última actualización**: 20 de octubre, 2025  
**Versión del sistema**: Astro 4.x con blog dinámico
