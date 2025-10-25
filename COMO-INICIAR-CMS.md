# 🚀 CÓMO INICIAR EL BLOG + CMS

## ⚡ MÉTODO SÚPER RÁPIDO (TODO EN UNO)

### 🎯 Opción 1: Script TODO-EN-UNO (MÁS RÁPIDO)

**Haz doble click en:**
```
INICIAR-TODO.bat
```

**Esto hace TODO automáticamente:**
- ✅ Inicia servidor Astro
- ✅ Inicia servidor CMS
- ✅ Abre navegador en Frontend
- ✅ Abre navegador en CMS Admin

**¡EN UN SOLO CLICK! 🚀**

---

## ✅ MÉTODO MANUAL (Solo Servidores)

### Opción 2: Usando archivo .bat

1. **Haz doble click en:**
   ```
   iniciar-cms-blog.bat
   ```

2. **Se abrirán 2 ventanas automáticamente:**
   - ✅ Ventana 1: Frontend Astro
   - ✅ Ventana 2: Servidor CMS

3. **Abre manualmente tu navegador:**
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
├── INICIAR-TODO.bat         ← ⚡ SUPER RÁPIDO (TODO EN UNO)
├── iniciar-cms-blog.bat     ← Solo servidores
├── iniciar-cms-blog.ps1     ← Versión PowerShell
└── COMO-INICIAR-CMS.md      ← Estás aquí
```

---

## 🖥️ BONUS: CREAR ACCESO DIRECTO EN ESCRITORIO

Para tenerlo más a mano:

1. **Click derecho en `INICIAR-TODO.bat`**
2. **Selecciona:** "Enviar a" → "Escritorio (crear acceso directo)"
3. **¡Listo!** Ahora tienes un acceso directo en tu escritorio

**Opcional:** Cambiar el icono del acceso directo:
1. Click derecho en el acceso directo → Propiedades
2. Cambiar icono → Buscar un icono bonito
3. Aplicar

---

## 🎯 RESUMEN

**ANTES (Método complicado):**
```bash
1. Abrir terminal 1
2. npm run dev
3. Abrir terminal 2
4. node blog-server.js
5. Abrir navegador manualmente
6. Ir a http://localhost:4321
7. Abrir otra pestaña
8. Ir a http://localhost:3001/admin
```

**AHORA (Un solo click):**
```
Doble click → INICIAR-TODO.bat

✅ Servidores iniciados
✅ Navegadores abiertos
✅ Listo para trabajar
```

**Tiempo ahorrado: De 2 minutos a 5 segundos** ⚡

¡Eso es todo! 🎉
