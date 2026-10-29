import type { FAQ } from './soluciones';

export interface Zona {
  slug: string;
  nombre: string;
  municipio: string;       // Medellín, Envigado, Itagüí...
  tipo: 'barrio' | 'comuna' | 'municipio';
  wikipedia?: string;
  geo: { lat: number; lng: number };
  intro: string;           // contexto comercial único (anti contenido duplicado)
  ejes: string[];          // zonas/ejes comerciales de referencia
  perfil: string[];        // tipos de negocio predominantes
  enfoque: string[];       // slugs de soluciones más relevantes para la zona (orden)
  caso: string;            // ejemplo de uso local concreto
  faqs: FAQ[];
}

export const ZONAS: Zona[] = [
  {
    slug: 'el-poblado',
    nombre: 'El Poblado',
    municipio: 'Medellín',
    tipo: 'comuna',
    wikipedia: 'https://es.wikipedia.org/wiki/El_Poblado_(Medell%C3%ADn)',
    geo: { lat: 6.2087, lng: -75.5673 },
    intro:
      'El Poblado (comuna 14) concentra buena parte de las oficinas corporativas, consultorios, clínicas estéticas, restaurantes y hoteles de Medellín. Es también la zona con más visitantes extranjeros, por lo que muchos negocios atienden clientes en español e inglés y a cualquier hora.',
    ejes: ['Milla de Oro (avenida El Poblado)', 'Provenza y Parque Lleras', 'Manila', 'Astorga y Ciudad del Río', 'Las Palmas'],
    perfil: ['Clínicas estéticas y odontológicas', 'Hoteles y alojamientos turísticos', 'Inmobiliarias y proyectos de vivienda', 'Oficinas y servicios profesionales'],
    enfoque: ['agentes-ia-whatsapp', 'sitios-web-seo-geo', 'contenido-video-ia', 'automatizacion-procesos-ia', 'capacitacion-ia-empresas'],
    caso:
      'Un hotel boutique en Provenza recibe reservas por WhatsApp en varios idiomas a medianoche; un agente de IA bilingüe responde disponibilidad, tarifas y políticas, y deja la reserva lista para confirmar.',
    faqs: [
      { q: '¿Atienden empresas en El Poblado de forma presencial?', a: 'Sí. Hacemos el diagnóstico inicial en tus oficinas de El Poblado o por videollamada, según prefieras.' },
      { q: '¿Un chatbot con IA puede responder en inglés a turistas?', a: 'Sí. El agente detecta el idioma del cliente y responde en español, inglés u otros idiomas con la misma información de tu negocio.' },
    ],
  },
  {
    slug: 'laureles',
    nombre: 'Laureles',
    municipio: 'Medellín',
    tipo: 'barrio',
    wikipedia: 'https://es.wikipedia.org/wiki/Laureles_(Medell%C3%ADn)',
    geo: { lat: 6.2447, lng: -75.5917 },
    intro:
      'Laureles–Estadio (comuna 11) combina zona residencial tradicional con comercio de barrio, gastronomía, consultorios médicos y una creciente oferta de alojamiento para nómadas digitales. Sus negocios suelen ser pymes familiares que necesitan vender más sin aumentar nómina.',
    ejes: ['La 70', 'La 33', 'Primer Parque de Laureles', 'Avenida Nutibara', 'Zona del Estadio Atanasio Girardot'],
    perfil: ['Consultorios y centros de estética', 'Restaurantes y cafés', 'Hostales y apartamentos turísticos', 'Comercio y servicios de barrio'],
    enfoque: ['agentes-ia-whatsapp', 'automatizacion-procesos-ia', 'sitios-web-seo-geo', 'contenido-video-ia', 'capacitacion-ia-empresas'],
    caso:
      'Un consultorio en la 70 automatiza confirmaciones y recordatorios de citas por WhatsApp para reducir inasistencias, y deja que el agente reagende sin intervención de la recepción.',
    faqs: [
      { q: '¿La IA sirve para un negocio pequeño de barrio?', a: 'Sí. Las soluciones más rentables para pymes suelen ser sencillas: responder WhatsApp, agendar y recordar citas, y publicar contenido constante.' },
      { q: '¿Cuánto tarda implementar un agente para un consultorio?', a: 'Con agenda y preguntas frecuentes, entre 1 y 2 semanas.' },
    ],
  },
  {
    slug: 'calasanz',
    nombre: 'Calasanz',
    municipio: 'Medellín',
    tipo: 'barrio',
    geo: { lat: 6.2565, lng: -75.6025 },
    intro:
      'Calasanz, en la comuna 12 (La América), es un sector residencial de clase media con comercio activo de barrio, colegios, servicios de salud y negocios familiares consolidados. Su clientela es muy local y fiel, y se mueve mucho por recomendación y WhatsApp.',
    ejes: ['Carrera 80–81', 'Calle 50 (Colombia)', 'Sector de La América', 'Corredor hacia Floresta'],
    perfil: ['Comercio minorista', 'Servicios de salud y odontología', 'Educación y academias', 'Restaurantes y domicilios'],
    enfoque: ['agentes-ia-whatsapp', 'contenido-video-ia', 'automatizacion-procesos-ia', 'capacitacion-ia-empresas', 'sitios-web-seo-geo'],
    caso:
      'Una academia del sector responde automáticamente las preguntas sobre horarios, matrículas y costos que llegan por WhatsApp, y registra a cada interesado en una hoja de seguimiento.',
    faqs: [
      { q: '¿Atienden negocios en Calasanz y La América?', a: 'Sí, atendemos todo el occidente de Medellín: Calasanz, La América, Floresta, Laureles y Belén.' },
      { q: '¿Necesito una página web para usar IA en mi negocio?', a: 'No es obligatorio. Muchas soluciones funcionan solo con WhatsApp; la web suma cuando quieres captar clientes nuevos desde Google o ChatGPT.' },
    ],
  },
  {
    slug: 'el-tesoro',
    nombre: 'El Tesoro',
    municipio: 'Medellín',
    tipo: 'barrio',
    geo: { lat: 6.1985, lng: -75.5583 },
    intro:
      'El sector de El Tesoro, en la parte alta de El Poblado, reúne comercio de alto nivel, servicios de salud especializados y proyectos inmobiliarios de vivienda nueva. Sus clientes esperan atención rápida, personalizada y digital.',
    ejes: ['Centro Comercial El Tesoro', 'Transversal Superior', 'Loma de Los Parra', 'Loma del Tesoro'],
    perfil: ['Inmobiliarias y constructoras', 'Clínicas y especialistas', 'Retail y marcas premium', 'Gimnasios y bienestar'],
    enfoque: ['agentes-ia-whatsapp', 'sitios-web-seo-geo', 'contenido-video-ia', 'automatizacion-procesos-ia', 'capacitacion-ia-empresas'],
    caso:
      'Una sala de ventas de un proyecto de vivienda califica prospectos 24/7 (presupuesto, crédito, fecha de compra) y agenda visitas solo con los compradores listos.',
    faqs: [
      { q: '¿La IA puede calificar compradores de vivienda?', a: 'Sí. El agente hace las preguntas clave (presupuesto, forma de pago, plazo) y prioriza a los prospectos más avanzados para el asesor.' },
      { q: '¿Pueden hacer recorridos o videos de proyectos con IA?', a: 'Sí: combinamos grabación real con renders y edición asistida por IA para piezas de venta y pauta.' },
    ],
  },
  {
    slug: 'centro-medellin',
    nombre: 'Centro de Medellín',
    municipio: 'Medellín',
    tipo: 'comuna',
    wikipedia: 'https://es.wikipedia.org/wiki/La_Candelaria_(Medell%C3%ADn)',
    geo: { lat: 6.2476, lng: -75.5658 },
    intro:
      'El Centro (comuna 10, La Candelaria) es el mayor polo de comercio mayorista y minorista de la ciudad. Miles de negocios venden por volumen, por WhatsApp y a domicilio, con márgenes ajustados donde cada hora de atención cuenta.',
    ejes: ['Junín', 'Carabobo', 'El Hueco', 'Parque Berrío', 'San Antonio', 'Avenida Oriental'],
    perfil: ['Comercio mayorista y distribuidores', 'Textil y confección', 'Tecnología y celulares', 'Servicios profesionales y trámites'],
    enfoque: ['agentes-ia-whatsapp', 'automatizacion-procesos-ia', 'contenido-video-ia', 'capacitacion-ia-empresas', 'sitios-web-seo-geo'],
    caso:
      'Un distribuidor de El Hueco usa un agente de IA para responder precios por mayor, disponibilidad y envíos a otras ciudades, y pasa los pedidos confirmados a facturación automáticamente.',
    faqs: [
      { q: '¿Un bot puede enviar catálogos y precios por WhatsApp?', a: 'Sí. El agente consulta tu catálogo actualizado y responde precios, referencias y disponibilidad; también puede enviar fotos de productos.' },
      { q: '¿La IA sirve para vender al por mayor?', a: 'Sí: filtra a los clientes mayoristas, aplica listas de precios por volumen y entrega pedidos ordenados al equipo comercial.' },
    ],
  },
  {
    slug: 'envigado',
    nombre: 'Envigado',
    municipio: 'Envigado',
    tipo: 'municipio',
    wikipedia: 'https://es.wikipedia.org/wiki/Envigado',
    geo: { lat: 6.1759, lng: -75.5917 },
    intro:
      'Envigado es uno de los municipios con mejor calidad de vida del Valle de Aburrá y tiene un tejido fuerte de pymes, consultorios, restaurantes y empresas de servicios. Muchos de sus negocios ya tienen clientela estable y buscan eficiencia más que volumen.',
    ejes: ['Parque Principal de Envigado', 'Zona Rosa de Envigado', 'Avenida Las Vegas', 'Sector de Viva Envigado', 'Avenida El Poblado sur'],
    perfil: ['Servicios de salud y estética', 'Gastronomía', 'Empresas de servicios B2B', 'Inmobiliarias'],
    enfoque: ['automatizacion-procesos-ia', 'agentes-ia-whatsapp', 'sitios-web-seo-geo', 'capacitacion-ia-empresas', 'contenido-video-ia'],
    caso:
      'Una empresa de servicios en Envigado automatiza cotizaciones: el cliente llena un formulario, la IA arma la propuesta en PDF y el CRM programa el seguimiento.',
    faqs: [
      { q: '¿Trabajan con empresas de Envigado?', a: 'Sí, Envigado está dentro de nuestra zona de atención presencial en el Valle de Aburrá.' },
      { q: '¿Se pueden automatizar cotizaciones con IA?', a: 'Sí. A partir de los datos del cliente, la IA genera la cotización con tus precios y condiciones y la envía por correo o WhatsApp.' },
    ],
  },
  {
    slug: 'itagui',
    nombre: 'Itagüí',
    municipio: 'Itagüí',
    tipo: 'municipio',
    wikipedia: 'https://es.wikipedia.org/wiki/Itag%C3%BC%C3%AD',
    geo: { lat: 6.1719, lng: -75.6114 },
    intro:
      'Itagüí es un municipio industrial y comercial del sur del Valle de Aburrá, con fuerte presencia de manufactura, confección, logística y comercio. Sus empresas manejan muchos procesos operativos que se prestan para automatizar.',
    ejes: ['Parque Principal de Itagüí', 'Zona industrial', 'Centro de la Moda', 'Autopista Sur', 'Sector de Ditaires'],
    perfil: ['Industria y manufactura', 'Confección y moda', 'Logística y distribución', 'Comercio local'],
    enfoque: ['automatizacion-procesos-ia', 'agentes-ia-whatsapp', 'capacitacion-ia-empresas', 'contenido-video-ia', 'sitios-web-seo-geo'],
    caso:
      'Una confección de Itagüí automatiza la lectura de órdenes de compra y facturas con IA, y envía reportes diarios de producción al gerente por WhatsApp.',
    faqs: [
      { q: '¿La IA sirve para empresas industriales?', a: 'Sí, especialmente en tareas administrativas: lectura de documentos, inventarios, reportes y atención a distribuidores.' },
      { q: '¿Capacitan al personal operativo?', a: 'Sí, adaptamos los talleres al rol: administrativos, comerciales y mandos medios.' },
    ],
  },
  {
    slug: 'sabaneta',
    nombre: 'Sabaneta',
    municipio: 'Sabaneta',
    tipo: 'municipio',
    wikipedia: 'https://es.wikipedia.org/wiki/Sabaneta',
    geo: { lat: 6.1515, lng: -75.6166 },
    intro:
      'Sabaneta ha tenido uno de los crecimientos inmobiliarios y comerciales más rápidos del Valle de Aburrá. Nuevos conjuntos residenciales, centros comerciales y negocios de servicios compiten por una población joven que busca y compra desde el celular.',
    ejes: ['Parque de Sabaneta', 'Mayorca', 'Avenida Las Vegas', 'Aves María', 'Sector de La Doctora'],
    perfil: ['Constructoras e inmobiliarias', 'Gastronomía y entretenimiento', 'Gimnasios y estética', 'Comercio y servicios del hogar'],
    enfoque: ['agentes-ia-whatsapp', 'contenido-video-ia', 'sitios-web-seo-geo', 'automatizacion-procesos-ia', 'capacitacion-ia-empresas'],
    caso:
      'Una inmobiliaria de Sabaneta responde automáticamente consultas de arriendo (canon, requisitos, disponibilidad) y agenda visitas a los apartamentos sin saturar a los asesores.',
    faqs: [
      { q: '¿Atienden negocios en Sabaneta?', a: 'Sí, Sabaneta está en nuestra zona de atención presencial del sur del Valle de Aburrá.' },
      { q: '¿Un agente de IA puede agendar visitas a inmuebles?', a: 'Sí. Consulta la agenda del asesor, propone horarios y envía recordatorios al interesado.' },
    ],
  },
  {
    slug: 'belen',
    nombre: 'Belén',
    municipio: 'Medellín',
    tipo: 'comuna',
    wikipedia: 'https://es.wikipedia.org/wiki/Bel%C3%A9n_(Medell%C3%ADn)',
    geo: { lat: 6.2317, lng: -75.6033 },
    intro:
      'Belén (comuna 16) es una de las comunas más pobladas de Medellín, con mucho comercio de barrio, servicios de salud y gastronomía tradicional. Sus negocios atienden un volumen alto de clientes recurrentes, sobre todo por WhatsApp y redes sociales.',
    ejes: ['Parque de Belén', 'Calle 30', 'Los Molinos', 'Avenida 80', 'Belén La Palma'],
    perfil: ['Clínicas, consultorios y laboratorios', 'Restaurantes y domicilios', 'Comercio minorista', 'Gimnasios y estética'],
    enfoque: ['agentes-ia-whatsapp', 'automatizacion-procesos-ia', 'contenido-video-ia', 'sitios-web-seo-geo', 'capacitacion-ia-empresas'],
    caso:
      'Un centro de estética en Belén usa un agente de IA para responder precios de tratamientos, enviar indicaciones previas y agendar valoraciones en la noche, cuando llegan más mensajes.',
    faqs: [
      { q: '¿Atienden negocios en Belén?', a: 'Sí, atendemos toda la comuna de Belén y el occidente de Medellín.' },
      { q: '¿La IA puede atender pedidos a domicilio?', a: 'Sí: toma el pedido, confirma dirección y método de pago, y lo envía a cocina o despacho.' },
    ],
  },
  {
    slug: 'bello',
    nombre: 'Bello',
    municipio: 'Bello',
    tipo: 'municipio',
    wikipedia: 'https://es.wikipedia.org/wiki/Bello_(Antioquia)',
    geo: { lat: 6.3373, lng: -75.5579 },
    intro:
      'Bello es el segundo municipio más poblado del Valle de Aburrá y la puerta del norte del área metropolitana. Su economía mezcla comercio, servicios, educación e industria, con muchas empresas en proceso de digitalización.',
    ejes: ['Parque Santander de Bello', 'Puerta del Norte', 'Avenida Regional / Autopista Norte', 'Niquía'],
    perfil: ['Comercio y retail', 'Educación e institutos', 'Servicios de salud', 'Industria y logística'],
    enfoque: ['agentes-ia-whatsapp', 'capacitacion-ia-empresas', 'automatizacion-procesos-ia', 'sitios-web-seo-geo', 'contenido-video-ia'],
    caso:
      'Un instituto de formación en Bello atiende con IA las consultas de inscripción por WhatsApp, envía la información del programa y registra a los interesados en su CRM.',
    faqs: [
      { q: '¿Atienden empresas en Bello y el norte del Valle de Aburrá?', a: 'Sí, atendemos Bello, Copacabana y el norte del área metropolitana de forma presencial y virtual.' },
      { q: '¿Qué solución de IA es la mejor para empezar?', a: 'Para la mayoría de negocios, un agente que responda WhatsApp y agende. Es la que muestra resultados más rápido.' },
    ],
  },
];

export const getZona = (slug: string) => ZONAS.find((z) => z.slug === slug);
