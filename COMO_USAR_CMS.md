# 🎨 CÓMO USAR EL CMS DEL BLOG

## 🚀 PASOS RÁPIDOS PARA INICIAR

### **1. Abrir DOS terminales en la carpeta del proyecto**

**Terminal 1 (PowerShell):**
```powershell
cd C:\Users\edici\OneDrive\Documentos\edicion-aular-astro
```

**Terminal 2 (PowerShell):**
```powershell
cd C:\Users\edici\OneDrive\Documentos\edicion-aular-astro
```

---

### **2. En Terminal 1 - Iniciar el CMS**

```bash
node blog-server.js
```

**✅ Verás esto cuando esté listo:**
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Blog CMS Server iniciado correctamente              ║
║                                                           ║
║   📝 Admin Panel: http://localhost:3001/admin           ║
║   🔗 API Endpoint: http://localhost:3001/api/posts      ║
║                                                           ║
║   ✅ Listo para gestionar tu blog sin deploy             ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

**⚠️ IMPORTANTE:** ¡NO cierres esta terminal! Debe quedarse abierta.

---

### **3. En Terminal 2 - Iniciar Astro**

```bash
npm run dev
```

**✅ Verás esto:**
```
🚀 astro v4.x.x started in X ms

  ➜  Local:   http://localhost:4321/
```

---

### **4. Abrir el CMS en tu navegador**

**Panel Admin:**  
👉 **http://localhost:3001/admin**

**Tu Blog:**  
👉 **http://localhost:4321/blog**

---

## 📝 GESTIONAR POSTS CON EL CMS

### **Crear Nuevo Post:**

1. **Click en "➕ Crear Nuevo Post"**
2. **Completa el formulario:**
   - Título
   - Slug (URL del artículo)
   - Excerpt (resumen corto)
   - Contenido (HTML)
   - Imagen (arrastra archivo o pega URL)
   - Categoría
   - Tags (presiona Enter para agregar)

3. **⚠️ IMPORTANTE - COMILLAS:**
   - **USA SOLO COMILLAS SIMPLES** (`'`) en el contenido HTML
   - **NO uses comillas dobles** (`"`) dentro del contenido
   - **Ejemplo CORRECTO:**
   ```html
   <p>La primera vez que hice una oferta 'a lo Kennedy'...</p>
   ```
   - **Ejemplo INCORRECTO:**
   ```html
   <p>La primera vez que hice una oferta "a lo Kennedy"...</p> ❌
   ```

4. **Click "💾 Guardar Post"**

---

### **Editar Post Existente:**

1. Busca el post en la lista
2. Click "✏️ Editar"
3. Modifica lo necesario
4. Click "💾 Guardar Post"

---

### **Eliminar Post:**

1. Click "🗑️ Eliminar"
2. Confirmar en el popup

---

## 🖼️ SUBIR IMÁGENES

### **Método 1: Drag & Drop**
1. Click "Elegir archivo"
2. Selecciona imagen (jpg, png, webp - máx 5MB)
3. El CMS la sube automáticamente a `/public/img/blog/`
4. Campo URL se completa solo

### **Método 2: URL Manual**
1. Sube imagen manualmente a `/public/img/blog/`
2. Pega ruta en campo: `/img/blog/mi-imagen.webp`

---

## 🛑 CERRAR TODO CUANDO TERMINES

### **Cerrar en orden:**

1. **Terminal 2 (Astro):**
   - Presiona `Ctrl + C`
   - Confirma con `S` (Sí)

2. **Terminal 1 (CMS):**
   - Presiona `Ctrl + C`
   - Confirma con `S` (Sí)

3. **Navega tu blog:**
   - Abre http://localhost:4321/blog
   - Verifica que los cambios se vean bien

---

## ⚠️ PROBLEMAS COMUNES

### **Error: "port 3001 already in use"**
- El CMS ya está corriendo
- Cierra la terminal anterior o usa: `taskkill /F /IM node.exe` (cierra TODOS los procesos node)

### **Error: "Cannot find module express"**
```bash
npm install --save-dev express cors multer
```

### **Los cambios no aparecen en el blog**
1. Haz hard refresh: `Ctrl + Shift + R`
2. Verifica que el CMS guardó correctamente (debe decir "✅ Post actualizado")
3. Reinicia Astro (Terminal 2): `Ctrl + C` y luego `npm run dev`

### **JSON corrupto (error al cargar posts)**
1. Verifica que no uses comillas dobles (`"`) en el contenido
2. Ejecuta: `node check-valid.js` para validar el JSON
3. Si hay error, edita los posts problemáticos con el CMS

---

## 🎯 RESUMEN RÁPIDO

```bash
# Terminal 1
node blog-server.js

# Terminal 2  
npm run dev

# Navegador
http://localhost:3001/admin  → CMS
http://localhost:4321/blog   → Tu Blog
```

**✅ ¡Listo para crear contenido!** 🎨
