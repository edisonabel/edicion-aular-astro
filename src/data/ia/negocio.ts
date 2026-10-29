// Datos NAP (Name, Address, Phone) únicos para todo el sitio.
// IMPORTANTE: deben coincidir EXACTAMENTE con el perfil de Google Business.
export const NEGOCIO = {
  nombre: 'Edición Aular',
  url: 'https://edicionaular.com',
  telefono: '+57 300 273 0128',
  whatsapp: 'https://wa.me/573002730128',
  agenda: 'https://cal.com/edicion-aular-website',
  // TODO: reemplazar con la dirección exacta del perfil de Google Business
  direccion: {
    calle: 'El Poblado',
    ciudad: 'Medellín',
    region: 'Antioquia',
    postal: '050021',
    pais: 'CO',
  },
  geo: { lat: 6.2442, lng: -75.5812 },
  googleMaps: 'https://www.google.com/maps?cid=489510875751096164',
  logo: 'https://edicionaular.com/img/Edicion-Aular-Logo.png',
  redes: [
    'https://www.facebook.com/edicionaular',
    'https://www.instagram.com/edicion_aular/',
    'https://www.tiktok.com/@edicionaular8',
    'https://vimeo.com/user67007640',
  ],
  // Posicionamiento: la herramienta existe; lo que vendemos es la solución al problema.
  propuesta:
    'Las herramientas de IA ya están al alcance de todos; lo escaso es saber qué problema resolver con ellas. En Edición Aular diseñamos e implementamos soluciones de IA específicas para empresas de Medellín y el Valle de Aburrá, medidas por resultados de negocio.',
  actualizado: '2026-10-29',
};

// Estadísticas citables (regla GEO: dato + fuente + año).
// Revisar y actualizar anualmente.
export const ESTADISTICAS = {
  whatsapp: {
    dato: 'Más del 90 % de los usuarios de internet en Colombia usa WhatsApp cada mes',
    fuente: 'DataReportal – Digital 2025: Colombia',
    url: 'https://datareportal.com/reports/digital-2025-colombia',
  },
  adopcionIA: {
    dato: 'Alrededor de 4 de cada 10 empresas colombianas ya usan alguna herramienta de IA, pero la mayoría solo en tareas básicas',
    fuente: 'Sondeos empresariales 2025 (Cámara de Comercio / prensa económica)',
    url: '',
  },
  pilotos: {
    dato: 'La mayoría de iniciativas corporativas de IA se queda en fase piloto y no escala',
    fuente: 'Deloitte – State of Generative AI in the Enterprise',
    url: 'https://www2.deloitte.com/us/en/pages/consulting/articles/state-of-generative-ai-in-enterprise.html',
  },
};

// Normativa colombiana citable (equivalente local a "reglas" que las IA citan).
export const NORMATIVA = {
  habeasData: {
    nombre: 'Ley 1581 de 2012 (Protección de datos personales)',
    resumen:
      'Exige autorización previa, expresa e informada para tratar datos personales y trato reforzado para datos sensibles (como los de salud). Todo chatbot o automatización que capture nombres, teléfonos o historiales debe pedir esa autorización y enlazar la política de tratamiento.',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981',
  },
  decreto1377: {
    nombre: 'Decreto 1377 de 2013',
    resumen: 'Reglamenta la Ley 1581: cómo solicitar la autorización y cómo publicar la política de tratamiento de datos.',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646',
  },
  ley2300: {
    nombre: 'Ley 2300 de 2023 ("Dejen de fregar")',
    resumen:
      'Limita los contactos comerciales a consumidores: solo de lunes a viernes de 7:00 a. m. a 7:00 p. m. y sábados de 8:00 a. m. a 3:00 p. m., máximo una vez por semana por el mismo canal y nunca domingos ni festivos. Aplica a campañas de WhatsApp, SMS y llamadas automatizadas.',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=215451',
  },
  conpesIA: {
    nombre: 'CONPES 4144 de 2025 – Política Nacional de Inteligencia Artificial',
    resumen: 'Define la hoja de ruta de Colombia para un uso ético y responsable de la IA, con énfasis en adopción por parte de empresas y Mipymes.',
    url: 'https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf',
  },
  rnt: {
    nombre: 'Registro Nacional de Turismo (Ley 2068 de 2020)',
    resumen: 'Todo prestador turístico debe tener RNT vigente y mostrarlo en su publicidad, incluida la web y los mensajes automatizados.',
    url: 'https://rnt.confecamaras.co/',
  },
};
