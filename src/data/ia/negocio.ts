// Identidad pública. La cobertura no representa oficinas ni domicilios en cada zona.
// No publicar calle, código postal, coordenadas u horarios sin confirmación del negocio.
export const NEGOCIO = {
  nombre: 'Edición Aular',
  url: 'https://edicionaular.com',
  telefono: '+57 300 273 0128',
  whatsapp: 'https://wa.me/573002730128',
  agenda: 'https://cal.com/edicion-aular-website',
  ciudad: 'Medellín',
  region: 'Antioquia',
  pais: 'CO',
  googleMaps: 'https://www.google.com/maps?cid=489510875751096164',
  logo: 'https://edicionaular.com/img/Edicion-Aular-Logo.png',
  redes: ['https://www.facebook.com/edicionaular', 'https://www.instagram.com/edicion_aular/', 'https://www.tiktok.com/@edicionaular8', 'https://vimeo.com/user67007640'],
  propuesta: 'Diseñamos soluciones de inteligencia artificial para empresas de Medellín y el Valle de Aburrá: atención por WhatsApp, automatización, contenido y sitios web. Partimos de tus procesos, conectamos las herramientas que necesitas y acordamos cómo medir el resultado.',
};

// Referencias informativas, no certificaciones de cumplimiento de un cliente.
export const NORMATIVA = {
  habeasData: {
    nombre: 'Ley 1581 de 2012 · Protección de datos',
    resumen: 'El tratamiento de datos personales requiere una base legal y, cuando corresponda, autorización previa e informada. Diseñamos la captura de datos, los permisos y el acceso a la política de tratamiento. Los datos sensibles exigen medidas adicionales.',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981',
  },
  decreto1377: {
    nombre: 'Decreto 1377 de 2013 · Tratamiento de datos',
    resumen: 'Reglamenta aspectos de la autorización y las políticas de tratamiento de datos personales. Revisamos qué información necesita cada flujo y cómo documentar su uso; sus disposiciones deben leerse junto con la normativa vigente.',
    url: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646',
  },
  ley2300: {
    nombre: 'Ley 2300 de 2023 · Contactos comerciales',
    resumen: 'Establece horarios de contacto: lunes a viernes de 7:00 a. m. a 7:00 p. m. y sábados de 8:00 a. m. a 3:00 p. m., con exclusión de domingos y festivos. El artículo 3 limita la combinación de canales en una semana y los contactos en un día tras el contacto directo; el artículo 5 regula también comunicaciones comerciales y opciones de retiro. Cada flujo debe revisar su finalidad, autorizaciones y excepciones aplicables.',
    url: 'https://normativa.colpensiones.gov.co/compilacion/docs/ley_2300_2023.htm',
  },
  conpesIA: {
    nombre: 'CONPES 4144 de 2025 · Política nacional de IA',
    resumen: 'Es una política pública que orienta el desarrollo y la adopción responsable de IA en Colombia. La usamos como referencia de contexto; no es una certificación ni sustituye las obligaciones de protección de datos.',
    url: 'https://colaboracion.dnp.gov.co/CDT/Conpes/Econ%C3%B3micos/4144.pdf',
  },
  rnt: {
    nombre: 'Registro Nacional de Turismo',
    resumen: 'Los prestadores turísticos sujetos a registro deben mantener su RNT vigente y cumplir las reglas de identificación en publicidad. En los canales digitales incorporamos el número y la información que el prestador debe confirmar.',
    url: 'https://rnt.confecamaras.co/',
  },
};
