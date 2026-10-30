import type { FAQ } from './soluciones';

export interface Sector {
  slug: string;
  nombre: string;
  title: string;
  description: string;
  h1: string;
  respuesta: string;
  dolores: string[];
  usos: { solucion: string; uso: string }[]; // solucion = slug de SOLUCIONES
  normativa: ('habeasData' | 'decreto1377' | 'ley2300' | 'conpesIA' | 'rnt')[];
  zonas: string[];
  notaLegal: string;
  faqs: FAQ[];
}

export const SECTORES: Sector[] = [
  {
    slug: 'clinicas-estetica',
    zonas: ['el-poblado', 'laureles', 'calasanz', 'envigado'],
    nombre: 'Clínicas, odontología y estética',
    title: 'IA para Clínicas, Odontología y Estética en Medellín',
    description:
      'Agentes de IA que agendan valoraciones, confirman citas y responden precios por WhatsApp para clínicas, consultorios odontológicos y centros de estética.',
    h1: 'Soluciones de IA para clínicas, consultorios odontológicos y centros de estética',
    respuesta:
      'En clínicas, odontología y estética, la IA se usa sobre todo para responder consultas de tratamientos y precios, agendar valoraciones, confirmar citas y reducir inasistencias, siempre con autorización de datos sensibles de salud según la Ley 1581 de 2012. Edición Aular implementa estas soluciones para centros de salud y estética de Medellín.',
    dolores: [
      'Muchos mensajes preguntando precios que nunca se convierten en cita',
      'Inasistencias y cancelaciones de último momento',
      'Recepción saturada en horas pico y sin atención en la noche',
      'Contenido de antes/después y tratamientos difícil de producir constantemente',
    ],
    usos: [
      { solucion: 'agentes-ia-whatsapp', uso: 'Responde tratamientos, rangos de precio y agenda valoraciones 24/7.' },
      { solucion: 'automatizacion-procesos-ia', uso: 'Confirmaciones, recordatorios e indicaciones pre y post procedimiento.' },
      { solucion: 'contenido-video-ia', uso: 'Videos educativos y piezas de pauta con más frecuencia.' },
      { solucion: 'sitios-web-seo-geo', uso: 'Páginas por tratamiento optimizadas para Google y respuestas de IA.' },
    ],
    normativa: ['habeasData', 'decreto1377', 'ley2300'],
    notaLegal:
      'Los datos de salud son datos sensibles. El agente nunca debe emitir diagnósticos ni reemplazar la valoración profesional, y debe pedir autorización explícita antes de recoger información de salud.',
    faqs: [
      { q: '¿Un chatbot puede agendar citas médicas o estéticas?', a: 'Sí. Se conecta a la agenda del consultorio, muestra horarios disponibles, agenda y envía recordatorios automáticos.' },
      { q: '¿La IA puede dar precios de tratamientos estéticos?', a: 'Puede dar rangos o precios desde, según lo que defina la clínica, e invitar a una valoración para el precio final.' },
      { q: '¿Es legal manejar datos de pacientes con IA?', a: 'Sí, con autorización expresa para datos sensibles (Ley 1581 de 2012), políticas de tratamiento publicadas y herramientas que protejan la información.' },
      { q: '¿Cómo reducir inasistencias en un consultorio?', a: 'Con confirmaciones automáticas 24–48 horas antes, recordatorios el mismo día y opción de reagendar por WhatsApp sin llamar.' },
    ],
  },
  {
    slug: 'turismo-hoteles',
    zonas: ['el-poblado', 'laureles', 'centro-medellin', 'sabaneta'],
    nombre: 'Turismo y hoteles',
    title: 'IA para Hoteles y Turismo en Medellín | Edición Aular',
    description:
      'Agentes de IA bilingües para hoteles, hostales, agencias y tours en Medellín: reservas por WhatsApp 24/7, respuestas en inglés y automatización.',
    h1: 'Soluciones de IA para hoteles, hostales y empresas de turismo',
    respuesta:
      'En turismo y hotelería, la IA atiende reservas y preguntas en varios idiomas a cualquier hora, envía información previa a la llegada y automatiza reseñas y ventas adicionales (tours, traslados). Edición Aular implementa estos agentes para hoteles, hostales, apartamentos turísticos y operadores de Medellín, mostrando el RNT exigido por ley.',
    dolores: [
      'Consultas de turistas en otros idiomas y husos horarios',
      'Dependencia de plataformas con comisiones altas',
      'Preguntas repetidas sobre check-in, traslados y políticas',
      'Pocas reseñas pese a buenas experiencias',
    ],
    usos: [
      { solucion: 'agentes-ia-whatsapp', uso: 'Agente bilingüe que cotiza, reserva y responde 24/7.' },
      { solucion: 'automatizacion-procesos-ia', uso: 'Mensajes previos a la llegada, solicitud de reseñas y ventas de tours.' },
      { solucion: 'sitios-web-seo-geo', uso: 'Web de reservas directas posicionada para "hotel en El Poblado" y similares.' },
      { solucion: 'contenido-video-ia', uso: 'Videos y fotos de habitaciones y experiencias para redes y pauta.' },
    ],
    normativa: ['rnt', 'habeasData', 'ley2300'],
    notaLegal:
      'Todo prestador de servicios turísticos debe tener el Registro Nacional de Turismo vigente y mostrarlo en su publicidad. Además, en Colombia es obligatoria la prevención de la explotación sexual comercial de niños, niñas y adolescentes (Ley 679 de 2001).',
    faqs: [
      { q: '¿Un chatbot puede hacer reservas de hotel?', a: 'Sí. Consulta disponibilidad, cotiza según fechas y huéspedes, y deja la reserva lista o la confirma con un pago en línea.' },
      { q: '¿El agente de IA responde en inglés?', a: 'Sí, responde en el idioma del huésped (inglés, español, portugués y otros) con la misma información del hotel.' },
      { q: '¿Cómo conseguir más reservas directas sin Booking o Airbnb?', a: 'Con una web rápida y bien posicionada, respuesta inmediata por WhatsApp y beneficios por reservar directo. La IA ayuda a no perder consultas fuera de horario.' },
      { q: '¿Qué es el RNT y debo mostrarlo en mi web?', a: 'Es el Registro Nacional de Turismo. Es obligatorio para prestadores turísticos y debe aparecer en la publicidad, incluida la página web.' },
    ],
  },
  {
    slug: 'inmobiliarias',
    zonas: ['el-tesoro', 'envigado', 'sabaneta', 'bello'],
    nombre: 'Inmobiliarias y constructoras',
    title: 'IA para Inmobiliarias y Constructoras en Medellín',
    description:
      'Agentes de IA que califican compradores y arrendatarios, agendan visitas y responden por WhatsApp 24/7. Automatización para inmobiliarias en Medellín.',
    h1: 'Soluciones de IA para inmobiliarias y constructoras',
    respuesta:
      'En el sector inmobiliario, la IA recoge las necesidades de compradores y arrendatarios (presupuesto, características y fechas), agenda visitas, responde dudas sobre inmuebles y automatiza el seguimiento hasta el cierre. Edición Aular implementa estas soluciones para inmobiliarias y salas de ventas de Medellín y el Valle de Aburrá.',
    dolores: [
      'Muchos interesados que no califican para comprar o arrendar',
      'Asesores perdiendo tiempo en preguntas repetidas',
      'Prospectos de portales que se enfrían por respuesta lenta',
      'Seguimiento manual e irregular a compradores',
    ],
    usos: [
      { solucion: 'agentes-ia-whatsapp', uso: 'Organiza solicitudes, responde sobre inmuebles y propone visitas al asesor.' },
      { solucion: 'automatizacion-procesos-ia', uso: 'Leads de portales al CRM, seguimiento y recordatorios.' },
      { solucion: 'contenido-video-ia', uso: 'Recorridos, renders animados y piezas de pauta por proyecto.' },
      { solucion: 'sitios-web-seo-geo', uso: 'Páginas por proyecto y barrio (ej. apartamentos en Sabaneta).' },
    ],
    normativa: ['habeasData', 'ley2300'],
    notaLegal:
      'Los contactos comerciales a prospectos deben respetar los horarios y la frecuencia de la Ley 2300 de 2023, y los datos de los interesados requieren autorización de tratamiento (Ley 1581 de 2012).',
    faqs: [
      { q: '¿Cómo usar la IA en una inmobiliaria?', a: 'Algunos usos son organizar consultas de prospectos, agendar visitas, responder preguntas sobre inmuebles y hacer seguimiento automático hasta el cierre.' },
      { q: '¿Un chatbot puede calificar a un arrendatario?', a: 'Puede recopilar necesidades de búsqueda y fechas con autorización. La revisión de requisitos y cualquier decisión de aprobación o rechazo corresponden al equipo responsable, con criterios transparentes.' },
      { q: '¿Se pueden conectar los leads de los portales inmobiliarios?', a: 'Sí, los leads que llegan por correo o formulario se registran automáticamente en tu CRM y reciben respuesta inmediata por WhatsApp.' },
      { q: '¿A qué hora puedo escribirle a un prospecto por WhatsApp?', a: 'Según la Ley 2300 de 2023, de lunes a viernes de 7:00 a. m. a 7:00 p. m. y sábados de 8:00 a. m. a 3:00 p. m.; con exclusión de domingos y festivos para contactos comerciales. Las excepciones y autorizaciones deben revisarse según la finalidad del mensaje.' },
    ],
  },
];

export const getSector = (slug: string) => SECTORES.find((s) => s.slug === slug);
