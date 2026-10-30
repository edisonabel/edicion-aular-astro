# Informe de Auditoría y Revisión Técnica para Modelos de IA

**Proyecto:** Edición Aular (edicionaular.com)  
**Propósito:** Pivote estratégico hacia Soluciones con Inteligencia Artificial + Implementación de Arquitectura SEO (Ryze) y GEO (Auriti)  
**Fecha:** 2026-10-29  
**Rama de trabajo:** `feat/ia-seo-geo-local`  
**Pull Request:** [GitHub PR #1](https://github.com/edisonabel/edicion-aular-astro/pull/1)  
**Deploy Preview en vivo:** [https://deploy-preview-1--edicionaular.netlify.app](https://deploy-preview-1--edicionaular.netlify.app)  
**Repositorio local:** `C:\Users\edici\.gemini\antigravity\scratch\edicion-aular-astro`

---

## 1. Contexto del Negocio y Objetivos

### Sobre la Empresa
- **Marca:** Edición Aular.
- **Ubicación:** Medellín, Antioquia, Colombia (cobertura física en El Poblado, Laureles, Calasanz, El Tesoro, Centro de Medellín, Envigado, Itagüí, Sabaneta, Belén, Bello; y remota para todo el país).
- **Eslogan y Filosofía:** *"Creatividad para Alcanzar el Éxito"*. Las herramientas de IA existen y están democratizadas; la propuesta de valor de Edición Aular radica en diseñar soluciones reales a problemas operativos y comerciales específicos de las empresas, sin vender humo ni herramientas genéricas.

### Enfoque de Servicios (Pivote hacia IA)
1. **Agentes de IA para WhatsApp y Web:** Conexión oficial a Meta Cloud API (WhatsApp Business API), agendamiento automatizado, integración a CRM y traspaso fluido a agentes humanos.
2. **Automatización de Procesos con IA:** Eliminación de fricción operativa en cotizaciones, captura de prospectos, lectura de documentos y reportes.
3. **Sitios Web con SEO & GEO:** Desarrollo ultrarrápido optimizado tanto para motores tradicionales (Google, Bing) como motores de respuesta generativa (ChatGPT Search, Perplexity, Claude, Gemini).
4. **Capacitación y Formación para Equipos:** Adopción práctica y academias corporativas a la medida (ejemplo real: *Academia de Ventas* en formato comunidad).

---

## 2. Pila Tecnológica y Sistema de Diseño

- **Framework Web:** [Astro 5](https://astro.build/) en modo estático (`output: "static"`).
- **Despliegue e Infraestructura:** Netlify con CDN global, compresión HTML y code-splitting CSS.
- **Sistema de Diseño Base:** Plantilla **Bringer** (Dark Theme con estética de cristal esmerilado *frosted glass*, Swiper.js, GSAP/vanilla scroll triggers, jQuery para plugins específicos).
- **Reglas Estéticas Estrictas:**
  - Cero emojis (`✨`, `🚀`, etc.) en titulares y botones para evitar caricaturizar la marca.
  - Cero bordes de colores artificiales o gradientes no nativos; uso exclusivo de `.bringer-block` (`rgba(255, 255, 255, 0.03)` con borde `rgba(255, 255, 255, 0.08)`).
  - Tipografía clara: Cero textos en gris azulado/pizarra (`#64748b`, `#94a3b8`); todo el texto informativo se renderiza en **blanco puro (`#ffffff`)** o `rgba(255, 255, 255, 0.85)`.
  - Acordeones de FAQ idénticos al formato probado en `inversion.astro` (`.bringer-faq-list` con `.bringer-toggles-item.bringer-block`).

---

## 3. Arquitectura y Archivos Modificados / Creados

```
edicion-aular-astro/
├── public/
│   ├── llms.txt               # Manifiesto estructurado para LLMs y motores GEO (llmstxt.org)
│   ├── robots.txt             # Permisos explícitos para OAI-SearchBot, PerplexityBot, etc.
│   └── css/
│       └── geo-theme.css      # Soporte sobrio para breadcrumbs, stat-cards y tablas
├── src/
│   ├── lib/
│   │   └── schema.ts          # Generadores de Schema.org JSON-LD tipados
│   ├── data/
│   │   └── ia/
│   │       ├── negocio.ts     # NAP, estadísticas oficiales colombianas y marco legal
│   │       ├── soluciones.ts  # Fichas técnicas de las soluciones de IA
│   │       ├── zonas.ts       # 10 landings geolocalizadas de Medellín y Valle de Aburrá
│   │       └── sectores.ts    # 3 landings de sectores verticales (Salud/Estética, Hoteles, Real Estate)
│   ├── components/
│   │   └── geo/
│   │       ├── Breadcrumbs.astro # Migas de pan semánticas
│   │       ├── Cta.astro         # Bento Grid CTA oficial Bringer (bg-lava / Cal.com)
│   │       ├── FaqList.astro     # Acordeón oficial Bringer idéntico a inversion.astro
│   │       ├── JsonLd.astro      # Inyector de esquemas estructurados
│   │       └── Normativa.astro   # Tarjetas en cristal para Ley 1581, Ley 2300 y CONPES 4144
│   └── pages/
│       ├── index.astro        # Home: Propuesta de valor de IA integrada, sin mentoría
│       ├── servicios.astro    # Hub general de servicios con Soluciones IA en primer lugar
│       ├── inversion.astro    # Página de tarifas y transparencia de costos
│       ├── soluciones-ia/
│       │   ├── index.astro    # Hub de Soluciones de IA (Contadores sin NaN, catálogo, sectores)
│       │   └── [slug].astro   # Páginas dinámicas de cada solución (Steps alternados parallax)
│       ├── medellin/
│       │   ├── index.astro    # Directorio de cobertura local en Medellín
│       │   └── [zona].astro   # Landings locales (Bento Case Study layout)
│       └── sectores/
│           ├── index.astro    # Directorio de especialización por industria
│           └── [slug].astro   # Landings verticales con dolores y soluciones específicas
```

---

## 4. Implementación Estratégica Ryze SEO y Auriti GEO

### A. Cumplimiento de Citabilidad GEO (Generative Engine Optimization)
1. **Respuesta Directa (Answer-First):** Cada solución y landing local abre con una definición concisa y fáctica de 40 a 60 palabras, optimizada para fragmentos destacados de LLMs.
2. **Estadísticas Oficiales Colombianas:**
   - Adopción de WhatsApp en Colombia: 90%+ (*DataReportal Digital 2025*).
   - Tasa de prueba de IA en empresas colombianas: 4 de cada 10 / 40% (*Sondeos empresariales 2025*).
   - Estancamiento de pilotos corporativos de IA: 62% (*Deloitte State of GenAI*).
3. **Marco Legal Colombiano Citable:**
   - **Ley 1581 de 2012:** Régimen General de Protección de Datos Personales (autorización previa y expresa en bots).
   - **Ley 2300 de 2023:** Ley *"Dejen de Fregar"* (límites de horarios y frecuencias para contactos comerciales de prospección).
   - **CONPES 4144 de 2025:** Política Nacional de Inteligencia Artificial para Colombia.
4. **Archivos de Detección de Agentes:**
   - `/robots.txt`: Directivas `Allow: /` explícitas para `OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`, `Google-Extended`, `Bingbot`.
   - `/llms.txt`: Estructura estándar Markdown con resumen corporativo, servicios, ubicaciones y enlaces canónicos.

### B. Datos Estructurados (Schema.org JSON-LD)
Generación dinámica y tipada en cada plantilla:
- `ProfessionalService` con NAP validado, coordenadas geográficas de Medellín (`6.2442, -75.5812`) y CID de Google Business (`0x6cb178c46d59f64`).
- `Service` con entregables, áreas servidas (`areaServed`) y enlaces de oferta.
- `FAQPage` reflejando exactamente las preguntas frecuentes visibles en el DOM.
- `BreadcrumbList` para jerarquía de rastreo.

---

## 5. Solución a los Errores Técnicos Reportados

| Problema Identificado | Causa Raíz Técnica | Corrección Implementada |
| :--- | :--- | :--- |
| **`NaN` en contadores numéricos** | El script `Counters()` de Bringer (`main.js`) evalúa `Math.ceil()` sobre el texto interno. El string `"4 de 10"` causaba error NaN y el string `"+90%"` perdía sus símbolos. | Se configuraron números enteros puros (`90`, `40`, `62`) y los símbolos se gestionan mediante `data-prefix="+"` y `data-suffix="%"`. |
| **Solapamiento vertical en tarjetas de contador** | `.bringer-counter` en `style.css` usa CSS Subgrid de 2 filas. Agregar un `<p>` de fuente colisionaba con el label. | Se creó `.bringer-stat-card` con Flexbox en columna (`flex-direction: column; gap: 0.75rem; min-height: 220px`), eliminando cualquier colisión. |
| **FAQ colapsado como texto plano corrido** | Nombres de clases con guión simple (`bringer-toggles-item-title`) impedían que `main.js` ejecutara `Toggles()`, no añadía la flecha y no cerraba las respuestas. | Se adoptó la estructura 1:1 de `inversion.astro` con `.bringer-faq-list`, `.bringer-toggles-item.bringer-block`, `.bringer-toggles-item--title` y `data-appear="fade-up"`. |
| **Tabla normativa saturada y apretada** | Se utilizaba un elemento `<table>` plano que comprimía párrafos largos en celdas estrechas. | Se reemplazó por una rejilla de tarjetas en cristal (`bringer-grid-3cols bringer-block`) con espaciado amplio, enlaces a leyes y distintivo de cumplimiento. |
| **Textos en color gris pizarra / azulado** | Clases CSS con `#64748b` y `#94a3b8` se percibían azuladas en fondo oscuro. | Todos los textos informativos, pies legales y subtítulos se estandarizaron en blanco puro (`#ffffff`). |
| **Eliminación de Mentoría** | Se solicitó remover el servicio de mentoría de marca personal. | Se purgó del menú, del pie de página, de las rutas de servicios y del `index.astro`. |

---

## 6. Lista de Verificación para el Modelo Revisor

1. **Compilación Estática:** Ejecutar `npm run build` en el directorio del proyecto y verificar que genere 64 páginas estáticas con 0 errores y 0 advertencias de rutas.
2. **Navegabilidad y Enlaces Canónicos:** Revisar que los enlaces internos entre `/soluciones-ia`, `/medellin/` y `/sectores/` sean consistentes y no existan enlaces rotos hacia `/mentoria`.
3. **Comportamiento del Acordeón FAQ:** Comprobar en el navegador que las preguntas aparezcan cerradas por defecto y se abran al hacer clic rotando la flecha hacia abajo.
4. **Integridad de Contadores:** Verificar que no aparezca `NaN` y que se muestren `+90%`, `40%` y `62%`.
5. **Validación Rich Results (Google):** Inspeccionar el código fuente de cualquier landing y validar que los bloques `<script type="application/ld+json">` contengan JSON válido.
