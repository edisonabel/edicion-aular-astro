export interface FAQ { q: string; a: string }
export interface Solucion {
  slug: string;
  nombre: string;          // nombre corto (menús, enlaces)
  keyword: string;         // keyword principal
  title: string;           // <title> (≤ 60 car.)
  description: string;     // meta description (≤ 155 car.)
  h1: string;
  respuesta: string;       // "answer-first": párrafo citable de 40-60 palabras
  problema: string;
  incluye: string[];
  costoDepende: { factor: string; impacto: string }[];
  proceso: { paso: string; detalle: string }[];
  tiempo: string;
  normativa: ('habeasData' | 'decreto1377' | 'ley2300' | 'conpesIA' | 'rnt')[];
  servicioRelacionado?: { href: string; label: string };
  faqs: FAQ[];             // preguntas frecuentes del servicio; sin atribuirlas a investigaciones no documentadas
}

export const SOLUCIONES: Solucion[] = [
  {
    slug: 'agentes-ia-whatsapp',
    nombre: 'Agentes de IA para WhatsApp y web',
    keyword: 'chatbot con IA para WhatsApp en Medellín',
    title: 'Chatbot con IA para WhatsApp en Medellín | Edición Aular',
    description:
      'Agentes de IA que atienden, califican y agendan clientes por WhatsApp y tu web 24/7. Implementación con API oficial de Meta en Medellín.',
    h1: 'Agentes de IA para WhatsApp y web en Medellín',
    respuesta:
      'Un agente de IA para WhatsApp es un asistente entrenado con la información de tu negocio que responde preguntas, califica prospectos, agenda citas y pasa la conversación a un humano cuando hace falta. En Edición Aular lo implementamos sobre la API oficial de WhatsApp Business, conectado a tu agenda y CRM.',
    problema:
      'Los mensajes llegan a cualquier hora, el equipo responde tarde y los prospectos se enfrían. Tener la herramienta (un bot genérico) no resuelve eso: hay que diseñar qué responde, cuándo escala a un asesor y cómo se mide.',
    incluye: [
      'Diagnóstico de las 20–30 preguntas que más recibes y de tu proceso de venta',
      'Entrenamiento del agente con tu catálogo, precios, políticas y tono de marca',
      'Conexión con la API oficial de WhatsApp Business, sujeta a las políticas de Meta',
      'Agendamiento automático (Google Calendar, Cal.com u otro) y registro en CRM',
      'Traspaso a humano con contexto de la conversación',
      'Autorización de tratamiento de datos (Ley 1581) dentro del flujo',
      'Tablero de métricas: conversaciones, citas, tiempo de respuesta',
    ],
    costoDepende: [
      { factor: 'Número de canales', impacto: 'Solo WhatsApp vs. WhatsApp + web + Instagram' },
      { factor: 'Integraciones', impacto: 'Agenda, CRM, pasarela de pago, inventario o ERP' },
      { factor: 'Volumen de conversaciones', impacto: 'Define el consumo de tokens de IA y las tarifas de Meta' },
      { factor: 'Complejidad del conocimiento', impacto: 'FAQ simple vs. catálogo de cientos de productos o documentos' },
      { factor: 'Acompañamiento', impacto: 'Entrega llave en mano vs. optimización mensual' },
    ],
    proceso: [
      { paso: 'Diagnóstico', detalle: 'Revisamos tus chats reales y definimos qué debe resolver el agente.' },
      { paso: 'Diseño', detalle: 'Flujos, tono, reglas de escalamiento y textos legales.' },
      { paso: 'Implementación', detalle: 'Entrenamiento, integraciones y pruebas con casos reales.' },
      { paso: 'Lanzamiento y ajuste', detalle: 'Monitoreamos las primeras semanas y corregimos respuestas.' },
    ],
    tiempo: 'Entre 1 y 4 semanas según integraciones.',
    normativa: ['habeasData', 'ley2300'],
    servicioRelacionado: { href: '/diseno-web', label: 'Diseño web' },
    faqs: [
      { q: '¿Cuánto cuesta un chatbot con IA para WhatsApp en Colombia?', a: 'Depende de cuatro componentes: la implementación (pago único), la plataforma mensual, el consumo de IA y las tarifas vigentes de mensajería de Meta. El rango varía según integraciones y volumen; en Edición Aular cotizamos tras un diagnóstico gratuito para que pagues solo por lo que tu negocio necesita.' },
      { q: '¿Es legal usar un bot en WhatsApp para vender?', a: 'Sí, si usas la API oficial de WhatsApp Business, pides autorización de tratamiento de datos (Ley 1581 de 2012) y respetas los horarios y frecuencia de contacto de la Ley 2300 de 2023 cuando el bot inicia la conversación.' },
      { q: '¿El bot de IA reemplaza a mis asesores?', a: 'No. Resuelve las preguntas repetitivas y califica prospectos; los casos complejos o de cierre pasan a un asesor con todo el contexto. El objetivo es que tu equipo atienda menos chats y cierre más.' },
      { q: '¿Puedo usar mi número actual de WhatsApp?', a: 'Revisamos la cuenta y la elegibilidad del número. Según las opciones vigentes de Meta y del proveedor, puede ser posible migrarlo o mantener la app mediante coexistencia. Confirmamos el procedimiento y sus efectos antes de hacer cambios.' },
      { q: '¿Qué diferencia hay entre un chatbot normal y un agente de IA?', a: 'Un chatbot tradicional sigue menús fijos ("marque 1"). Un agente de IA entiende lenguaje natural, consulta tu información y ejecuta acciones como agendar o registrar un cliente en el CRM.' },
      { q: '¿En cuánto tiempo queda funcionando?', a: 'Un agente básico con FAQ y agenda puede quedar listo en 1–2 semanas; con integraciones a CRM, pagos o inventario, entre 3 y 4 semanas.' },
    ],
  },
  {
    slug: 'automatizacion-procesos-ia',
    nombre: 'Automatización de procesos con IA',
    keyword: 'automatización de procesos con IA en Medellín',
    title: 'Automatización de Procesos con IA en Medellín | Edición Aular',
    description:
      'Automatizamos tareas repetitivas con IA: CRM, facturas, agendamiento, reportes y seguimiento de clientes. Soluciones a la medida para empresas de Medellín.',
    h1: 'Automatización de procesos con IA para empresas en Medellín',
    respuesta:
      'La automatización de procesos con IA conecta las herramientas que ya usas (correo, hojas de cálculo, CRM, facturación, WhatsApp) para que tareas repetitivas como registrar clientes, enviar cotizaciones, leer facturas o generar reportes se hagan solas. Edición Aular diagnostica qué procesos te quitan más horas y automatiza primero los de mayor retorno.',
    problema:
      'Tu equipo pasa horas copiando datos entre sistemas, persiguiendo pagos o armando reportes. Existen decenas de herramientas (Make, Zapier, n8n, IA generativa), pero sin un diagnóstico terminas pagando suscripciones que nadie usa.',
    incluye: [
      'Mapeo de procesos y cálculo de horas que se pueden ahorrar',
      'Automatización de captura de leads hacia CRM y seguimiento',
      'Lectura inteligente de facturas, órdenes y documentos con IA',
      'Agendamiento, recordatorios y confirmaciones automáticas',
      'Reportes automáticos (ventas, marketing, operación) en tu correo o WhatsApp',
      'Documentación y capacitación para que tu equipo lo opere',
    ],
    costoDepende: [
      { factor: 'Cantidad de procesos', impacto: 'Un flujo puntual vs. un sistema completo' },
      { factor: 'Herramientas a conectar', impacto: 'Apps con API abierta vs. sistemas locales o antiguos' },
      { factor: 'Uso de IA', impacto: 'Reglas simples vs. lectura de documentos y toma de decisiones' },
      { factor: 'Volumen de operaciones', impacto: 'Costos de plataforma según ejecuciones mensuales' },
    ],
    proceso: [
      { paso: 'Auditoría de procesos', detalle: 'Identificamos tareas repetitivas y su costo en horas.' },
      { paso: 'Priorización', detalle: 'Elegimos las automatizaciones de mayor impacto y menor riesgo.' },
      { paso: 'Construcción', detalle: 'Desarrollamos, conectamos y probamos los flujos.' },
      { paso: 'Entrega y soporte', detalle: 'Capacitamos al equipo y monitoreamos errores.' },
    ],
    tiempo: 'Primer flujo en producción en 1–3 semanas.',
    normativa: ['habeasData', 'decreto1377'],
    servicioRelacionado: { href: '/lanzamientos-digitales', label: 'Lanzamientos digitales' },
    faqs: [
      { q: '¿Qué procesos de una empresa se pueden automatizar con IA?', a: 'Los más comunes son: registro y seguimiento de prospectos, cotizaciones, agendamiento y recordatorios, lectura de facturas y documentos, conciliaciones, reportes y respuestas a correos frecuentes.' },
      { q: '¿Necesito cambiar mi software actual para automatizar?', a: 'Normalmente no. Conectamos las herramientas que ya usas mediante sus integraciones o API. Solo recomendamos cambios cuando un sistema no permite ningún tipo de conexión.' },
      { q: '¿Qué es mejor: Zapier, Make o n8n?', a: 'Depende del volumen y la privacidad. Zapier es el más sencillo, Make ofrece más control a menor costo y n8n puede alojarse en tu propio servidor. Elegimos según tu caso, no por preferencia de herramienta.' },
      { q: '¿Cuánto tiempo se ahorra con la automatización?', a: 'Varía por proceso. Por eso iniciamos midiendo cuántas horas semanales consume cada tarea; así el ahorro se calcula con tus datos reales y no con promedios genéricos.' },
      { q: '¿Es seguro automatizar con datos de clientes?', a: 'Sí, si se configuran permisos mínimos, se registran las autorizaciones de tratamiento de datos (Ley 1581) y se evita enviar datos sensibles a herramientas que no los protegen.' },
    ],
  },
  {
    slug: 'contenido-video-ia',
    nombre: 'Contenido, video y fotos de producto con IA',
    keyword: 'producción de contenido con IA en Medellín',
    title: 'Contenido, Video y Fotos de Producto con IA | Edición Aular',
    description:
      'Producción audiovisual potenciada con IA: fotos de producto, videos cortos, avatares y piezas para pauta en menos tiempo. Atención en Medellín.',
    h1: 'Contenido, video y fotografía de producto con IA en Medellín',
    respuesta:
      'La producción de contenido con IA combina dirección creativa humana con herramientas de generación de imagen, video y voz para producir fotos de producto, videos cortos y piezas publicitarias más rápido y en más versiones. Edición Aular une su experiencia en producción audiovisual con flujos de IA para mantener la calidad y la identidad de tu marca.',
    problema:
      'Las redes y la pauta exigen decenas de piezas al mes. Generar imágenes con IA es fácil; que se vean profesionales, coherentes con tu marca y que vendan, no lo es.',
    incluye: [
      'Fotografía de producto con fondos y escenarios generados con IA',
      'Videos cortos (Reels, TikTok, Shorts) con edición asistida por IA',
      'Variaciones de anuncios para pruebas A/B en Meta y Google',
      'Voces, subtítulos y traducciones automáticas',
      'Avatares y presentadores virtuales cuando aplica',
      'Guía de estilo para mantener coherencia de marca',
    ],
    costoDepende: [
      { factor: 'Volumen mensual de piezas', impacto: 'Proyecto puntual vs. plan mensual' },
      { factor: 'Material base', impacto: 'Si existe producto físico para fotografiar o solo referencias' },
      { factor: 'Formato', impacto: 'Imagen estática, video corto o video con avatar/voz' },
      { factor: 'Nivel de postproducción', impacto: 'Retoque básico vs. acabado publicitario' },
    ],
    proceso: [
      { paso: 'Brief creativo', detalle: 'Objetivo, audiencia, canales y referencias.' },
      { paso: 'Producción híbrida', detalle: 'Captura real + generación y edición con IA.' },
      { paso: 'Revisión', detalle: 'Control de calidad humano y ajustes de marca.' },
      { paso: 'Entrega y medición', detalle: 'Piezas listas por formato y lectura de resultados en pauta.' },
    ],
    tiempo: 'Primeras piezas en 3–7 días hábiles.',
    normativa: ['habeasData'],
    servicioRelacionado: { href: '/produccion-audiovisual', label: 'Producción audiovisual' },
    faqs: [
      { q: '¿Se puede hacer fotografía de producto con inteligencia artificial?', a: 'Sí. Partimos de una foto real del producto y la IA genera escenarios, fondos e iluminación. Así el producto se mantiene fiel y se obtienen muchas versiones sin montar varias sesiones.' },
      { q: '¿El contenido hecho con IA funciona en publicidad?', a: 'Funciona cuando hay estrategia detrás: permite probar más variaciones de anuncio y encontrar más rápido la que convierte. La IA acelera la producción; la dirección creativa define el resultado.' },
      { q: '¿Las imágenes generadas con IA tienen derechos de autor?', a: 'La protección de obras generadas solo por IA no está plenamente definida en Colombia. Por eso combinamos material propio y edición humana, y usamos herramientas con licencias de uso comercial.' },
      { q: '¿Meta o Google penalizan anuncios hechos con IA?', a: 'No los penalizan por estar hechos con IA, pero pueden exigir etiquetarlos en ciertos casos (por ejemplo temas políticos o sociales). Revisamos las políticas vigentes de cada plataforma.' },
    ],
  },
  {
    slug: 'sitios-web-seo-geo',
    nombre: 'Sitios web con IA + SEO/GEO',
    keyword: 'posicionamiento en ChatGPT y Google para empresas en Medellín',
    title: 'Sitios web con SEO y GEO en Medellín | Edición Aular',
    description:
      'Diseñamos sitios web optimizados para Google y para respuestas de IA (ChatGPT, Gemini, AI Overviews). SEO local y GEO para empresas de Medellín.',
    h1: 'Sitios web con SEO y contenido preparado para búsquedas con IA',
    respuesta:
      'El SEO mejora la comprensión y el rastreo de tu sitio en buscadores. El GEO extiende ese trabajo a contenidos claros y verificables que puedan servir de fuente en respuestas con IA. En Edición Aular trabajamos estructura, rendimiento, información de negocio y medición, sin garantizar posiciones, recomendaciones ni citas.',
    problema:
      'Si tu web no explica con claridad qué haces, a quién ayudas y dónde atiendes, resulta difícil encontrar y comparar tus servicios. Organizamos esa información y resolvemos los problemas técnicos que dificultan su rastreo.',
    incluye: [
      'Arquitectura de contenido por servicio, zona y sector',
      'Investigación de preguntas reales de clientes ("People Also Ask")',
      'Datos estructurados Schema.org coherentes con la información publicada',
      'Control de rastreo con robots.txt y mapa editorial opcional en llms.txt',
      'Velocidad y Core Web Vitals optimizados (sitios estáticos)',
      'Enlazado interno estratégico y SEO local para Medellín y Valle de Aburrá',
      'Asistente de IA integrado en la web cuando aporta valor',
    ],
    costoDepende: [
      { factor: 'Número de páginas', impacto: 'Landing única vs. sitio con decenas de páginas locales' },
      { factor: 'Contenido', impacto: 'Si lo entregas tú o lo investigamos y redactamos' },
      { factor: 'Funcionalidades', impacto: 'Blog, asistente IA, reservas, e-commerce' },
      { factor: 'Competencia de la keyword', impacto: 'Nicho local vs. término muy disputado' },
    ],
    proceso: [
      { paso: 'Investigación', detalle: 'Keywords, preguntas reales y cómo responden hoy las IA sobre tu sector.' },
      { paso: 'Arquitectura', detalle: 'Mapa de páginas y enlazado interno.' },
      { paso: 'Diseño y desarrollo', detalle: 'Sitio rápido con contenido citable y Schema.' },
      { paso: 'Medición', detalle: 'Search Console, menciones en IA y conversiones.' },
    ],
    tiempo: 'Entre 3 y 8 semanas según alcance.',
    normativa: ['habeasData'],
    servicioRelacionado: { href: '/diseno-web', label: 'Diseño web' },
    faqs: [
      { q: '¿Qué es el GEO y en qué se diferencia del SEO?', a: 'El SEO busca posicionar en los resultados de Google; el GEO busca que los motores generativos (ChatGPT, Gemini, AI Overviews) citen tu sitio en sus respuestas. Se complementan: el GEO se apoya en un buen SEO técnico y añade respuestas directas, datos con fuente y estructura legible por IA.' },
      { q: '¿Cómo hago para que ChatGPT recomiende mi empresa?', a: 'Necesitas presencia consistente: un sitio con respuestas claras sobre lo que haces y dónde, perfil de Google Business completo, reseñas, menciones en otros sitios y datos estructurados. No existe un pago para aparecer; se gana con autoridad y claridad.' },
      { q: '¿Qué es el archivo llms.txt?', a: 'Es una convención propuesta para resumir el sitio y enlazar sus páginas clave en texto. Puede ayudar a algunas herramientas a consultar el contenido, pero no es un requisito de Google ni garantiza visibilidad o citas.' },
      { q: '¿Cuánto tiempo tarda en verse el SEO local?', a: 'En búsquedas locales poco competidas pueden verse movimientos en 4–8 semanas; en términos competidos, de 3 a 6 meses. La indexación, las posiciones y las citas dependen de cada buscador; estos plazos son orientativos y no una garantía.' },
      { q: '¿Sirve tener una página por barrio de Medellín?', a: 'Sí, siempre que cada página aporte información útil y distinta para esa zona. Las páginas duplicadas cambiando solo el nombre del barrio pueden ser penalizadas por Google.' },
    ],
  },
  {
    slug: 'capacitacion-ia-empresas',
    nombre: 'Capacitación en IA para equipos',
    keyword: 'capacitación en inteligencia artificial para empresas en Medellín',
    title: 'Capacitación en IA para Empresas en Medellín | Edición Aular',
    description:
      'Talleres prácticos de inteligencia artificial para equipos de ventas, marketing y operación. Casos prácticos con tus procesos reales en Medellín.',
    h1: 'Capacitación en inteligencia artificial para equipos',
    respuesta:
      'La capacitación en IA para empresas enseña a cada área (ventas, marketing, servicio, operación) a usar herramientas como ChatGPT, Gemini o Claude sobre sus propias tareas, con reglas claras de seguridad y calidad. Edición Aular diseña talleres prácticos con los procesos reales de tu empresa, no cursos genéricos.',
    problema:
      'Muchos empleados ya usan IA por su cuenta, sin criterio común ni cuidado con los datos de la empresa. Esto produce trabajo desigual y riesgos de confidencialidad.',
    incluye: [
      'Diagnóstico de madurez en IA por área',
      'Talleres prácticos presenciales en Medellín o virtuales',
      'Biblioteca de prompts y flujos para tu empresa',
      'Política interna de uso de IA y manejo de datos',
      'Sesiones de seguimiento para implementar lo aprendido',
      'Programas internos por módulos, adaptados a cada área',
    ],
    costoDepende: [
      { factor: 'Número de participantes', impacto: 'Grupo reducido vs. toda la empresa' },
      { factor: 'Formato', impacto: 'Taller único, programa por módulos o academia continua' },
      { factor: 'Personalización', impacto: 'Contenido estándar vs. casos con tus procesos' },
      { factor: 'Seguimiento', impacto: 'Taller puntual o acompañamiento mensual' },
    ],
    proceso: [
      { paso: 'Diagnóstico', detalle: 'Encuesta y entrevistas para medir el nivel actual.' },
      { paso: 'Diseño del programa', detalle: 'Módulos por área con ejercicios reales.' },
      { paso: 'Formación', detalle: 'Sesiones prácticas con entregables.' },
      { paso: 'Seguimiento', detalle: 'Acompañamiento y medición de adopción.' },
    ],
    tiempo: 'Talleres desde una jornada; programas de 4 a 12 semanas.',
    normativa: ['habeasData', 'conpesIA'],
    servicioRelacionado: { href: '/soluciones-ia', label: 'Soluciones de IA' },
    faqs: [
      { q: '¿Qué debe aprender un equipo sobre inteligencia artificial?', a: 'Lo esencial: redactar buenas instrucciones (prompts), verificar resultados, proteger información confidencial y aplicar la IA a sus tareas diarias concretas. Lo técnico se adapta a cada rol.' },
      { q: '¿La capacitación en IA es presencial o virtual?', a: 'Ambas. En Medellín y el Valle de Aburrá ofrecemos sesiones presenciales en tu empresa; para otros lugares, en vivo por videollamada.' },
      { q: '¿Qué es una academia interna a medida?', a: 'Es una plataforma propia de formación con contenidos de tu empresa (ventas, servicio, procesos) y comunidad, para entrenar a tu equipo de forma continua. Un ejemplo es Academia de Ventas, que desarrollamos en formato comunidad.' },
      { q: '¿Es necesaria una política de uso de IA en la empresa?', a: 'Es muy recomendable: define qué herramientas se permiten, qué datos no se pueden compartir y quién revisa los resultados. Ayuda a cumplir la Ley 1581 de protección de datos.' },
    ],
  },
];

export const getSolucion = (slug: string) => SOLUCIONES.find((s) => s.slug === slug);
