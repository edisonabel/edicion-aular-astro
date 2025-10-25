# 🚀 CÓMO INICIAR EL BLOG + CMS

## ✅ MÉTODO RÁPIDO (Recomendado)

### Opción 1: Usando archivo .bat (Más simple)

1. **Haz doble click en:**
   ```
   iniciar-cms-blog.bat
   ```

2. **Se abrirán 2 ventanas automáticamente:**
   - ✅ Ventana 1: Frontend Astro
   - ✅ Ventana 2: Servidor CMS

3. **Listo! Abre tu navegador:**
   - Frontend: `http://localhost:4321`
   - CMS Admin: `http://localhost:3001/admin`

---

### Opción 2: Usando PowerShell (Más elegante)

1. **Click derecho en `iniciar-cms-blog.ps1`**
2. **Selecciona: "Ejecutar con PowerShell"**

O desde terminal:
```powershell
.\iniciar-cms-blog.ps1
```

---

## ⚠️ IMPORTANTE

### Primera vez:
Si PowerShell te da error de permisos, ejecuta esto **una sola vez**:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🛑 CERRAR TODO

Para cerrar ambos servidores:
- Cierra las 2 ventanas que se abrieron
- O presiona `Ctrl + C` en cada ventana

---

## 📁 UBICACIÓN DE LOS ARCHIVOS

```
📁 edicion-aular-astro/
├── iniciar-cms-blog.bat     ← ESTE (doble click)
├── iniciar-cms-blog.ps1     ← O ESTE
└── COMO-INICIAR-CMS.md      ← Estás aquí
```

---

## 🎯 RESUMEN

**ANTES:**
```bash
# Terminal 1
npm run dev

# Terminal 2
node blog-server.js
```

**AHORA:**
```
Doble click → iniciar-cms-blog.bat
```

¡Eso es todo! 🎉
