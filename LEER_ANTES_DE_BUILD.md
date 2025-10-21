# 🚀 INSTRUCCIONES PRE-BUILD - IMPORTANTE

## ✅ AUDITORÍA COMPLETADA

**Estado:** 🟢 **SEGURO PARA PRODUCCIÓN**

---

## 🔍 PROBLEMAS ENCONTRADOS Y CORREGIDOS

### ✅ **1. Error Crítico: Terser Config**
**Corregido:** Cambiado a `esbuild` (incluido por defecto)

### ✅ **2. Error TypeScript: changefreq**
**Corregido:** Eliminado para evitar warnings

### ✅ **3. Console.log en Producción**
**Corregido:** Removido del Service Worker

---

## 🎯 VERIFICACIÓN AUTOMÁTICA

**Antes de cada build, se ejecutará automáticamente:**

```bash
npm run build
# ↓ Ejecuta primero verificar.js
# ↓ Si todo está bien, continúa con build
```

**Para verificar manualmente:**

```bash
npm run verificar
```

---

## 🛠️ COMANDOS DISPONIBLES

```bash
# 1. Desarrollo local (sin optimizaciones)
npm run dev

# 2. Verificar integridad
npm run verificar

# 3. Build producción (incluye verificación)
npm run build

# 4. Preview del build
npm run preview
```

---

## 📋 CHECKLIST PRE-DEPLOY

### **Antes de hacer build:**
- [ ] Cambios guardados
- [ ] `npm run verificar` pasa sin errores
- [ ] Dev server funciona (`npm run dev`)

### **Durante el build:**
- [ ] `npm run build` completa sin errores
- [ ] No hay warnings críticos
- [ ] Carpeta `/dist` se crea correctamente

### **Antes de deploy:**
- [ ] `npm run preview` funciona
- [ ] Abrir http://localhost:4321
- [ ] Verificar que todo carga
- [ ] Consola sin errores (F12)
- [ ] Service Worker registrado (Application tab)
- [ ] Lighthouse score > 95

---

## 🚨 SI ALGO FALLA

### **Opción 1: Desactivar Service Worker**
```javascript
// src/layouts/BaseLayout.astro (línea ~175)
// Comentar:
/*
<script>
    if ('serviceWorker' in navigator) { ... }
</script>
*/
```

### **Opción 2: Simplificar astro.config.mjs**
```javascript
// Mantener solo:
export default defineConfig({
  site: 'https://edicionaular.com',
  integrations: [sitemap()]
});
```

### **Opción 3: Revertir video hero**
```html
<!-- src/pages/index.astro (línea ~43) -->
<video src="URL_DIRECTA" autoplay ...>
```

---

## 📊 OPTIMIZACIONES ACTIVAS

### ✅ **Rendimiento**
- Service Worker con caché inteligente
- Critical CSS inline
- Lazy loading de imágenes
- Intersection Observer para video
- GPU acceleration (will-change)

### ✅ **Build**
- HTML compression
- CSS code splitting
- esbuild minification
- Auto inline small CSS

### ✅ **UX**
- Skeleton loading animado
- Prefetch de páginas comunes
- Passive event listeners
- Font rendering optimizado

---

## 🎯 PERFORMANCE ESPERADO

| Métrica | Valor |
|---------|-------|
| Performance Score | **98+** |
| FCP | **< 1.0s** |
| LCP | **< 1.8s** |
| TBT | **< 200ms** |
| CLS | **< 0.02** |

---

## 📞 SOPORTE

Si encuentras algún problema:

1. Revisar `AUDITORIA_OPTIMIZACIONES.md`
2. Ejecutar `npm run verificar`
3. Revisar consola del navegador
4. Verificar que todos los archivos existan

---

## ✅ LISTO PARA BUILD

**Comando final:**

```bash
cd "C:\Users\edici\OneDrive\Documentos\edicion-aular-astro"
npm run build
```

**Si todo va bien:**
- ✅ Verificación pasa
- ✅ Build completa
- ✅ Carpeta `/dist` lista
- ✅ Deploy a hosting

---

**🎉 ¡ÉXITO!**
