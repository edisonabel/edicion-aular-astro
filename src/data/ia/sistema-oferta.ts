// Oferta para clínicas fundadoras. `cupos` y `precioDesde` los define el propietario; mientras sean null no se publican.
export const OFERTA: { cupos: number | null; precioDesde: string | null } = {
  cupos: null,
  precioDesde: null,
};
export const FUNDADORAS = {
  recibes: ['Un precio reducido de clínica fundadora', 'Acompañamiento directo durante la implementación', 'Voz en cómo se construye cada etapa'],
  aCambio: ['Compartir tus preguntas frecuentes y cómo atiendes hoy', 'Revisar y aprobar lo que responde el asistente', 'Autorizar un caso público, con los datos que apruebes y sin datos de pacientes'],
  primerMes: ['Preguntas frecuentes y respuestas aprobadas', 'Recepción por WhatsApp con paso a una persona', 'Agenda y recordatorios de citas', 'Primer reporte de consultas y citas'],
};
// Trabajos reales del portafolio, en orden de cercanía con el sector salud.
export const TRABAJOS = [
  { slug: 'drjarod', sector: 'Salud · Quiropráctica en Florida' },
  { slug: 'ecosolares', sector: 'Energía solar · Perú' },
  { slug: 'bee', sector: 'Construcción y restauración' },
];
export const FAQS_SISTEMA = [
  { q: '¿Ya lo han instalado en otras clínicas?', a: 'Todavía no tenemos casos publicados de este sistema completo. Hemos trabajado marca, web, video y pauta en varios sectores, incluida una web con reservas para un quiropráctico. Por eso abrimos el sistema con clínicas fundadoras: construimos con ellas y solo publicamos resultados reales que aprueben.' },
  { q: '¿Reemplaza a recepción?', a: 'No. El asistente se encarga de las preguntas repetidas y deja cada solicitud ordenada. Recepción confirma las citas y atiende lo que necesita criterio de una persona.' },
  { q: '¿Qué pasa con una urgencia o una pregunta de salud?', a: 'El asistente no da indicaciones de salud. Avisa a una persona del equipo según las reglas que definamos contigo. Si alguien está en peligro, lo orienta a llamar a la línea de emergencias 123.' },
  { q: '¿Cómo se manejan los datos de los pacientes?', a: 'Los datos de salud son sensibles. Antes de empezar definimos qué se pide, con qué autorización, quién accede y cuánto tiempo se conserva, según la Ley 1581 de 2012 y las políticas de tu clínica. El asistente no reemplaza la historia clínica. Recomendamos que tu asesor legal revise el flujo.' },
  { q: '¿Funciona con mi agenda o mi software actual?', a: 'Depende de la herramienta. Revisamos si permite una conexión directa. Si no la permite, el asistente deja la solicitud lista para que recepción la registre y confirme.' },
  { q: '¿Qué costos tiene?', a: 'Se compone de la implementación, una mensualidad, las tarifas vigentes de Meta por WhatsApp y el consumo de IA si se usa un modelo. Te damos el alcance y el valor por escrito antes de empezar.' },
  { q: '¿Tengo que contratar todas las etapas?', a: 'No. Se implementa por partes. Empezamos donde hoy pierdes más pacientes y agregamos las demás cuando tenga sentido.' },
  { q: '¿Cuánto tarda en quedar funcionando?', a: 'Según las integraciones, la atención por WhatsApp suele tomar entre 1 y 4 semanas. Confirmamos el calendario después de revisar el alcance.' },
];
