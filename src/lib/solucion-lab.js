// Laboratorios por reglas: sin modelo, almacenamiento ni solicitudes de red. Orientan una conversación, no prometen resultados.
const horasMes=(veces,minutos)=>Math.round(veces*minutos*52/12/60);
const FLUJOS={
  'Registrar prospectos en el CRM':{disparador:'Llega un formulario o un mensaje',accion:'Se crea el registro y se avisa al responsable',revision:'Una persona confirma los datos dudosos'},
  'Preparar cotizaciones':{disparador:'Un asesor pide una cotización',accion:'Se arma el borrador con tus precios aprobados',revision:'El asesor revisa antes de enviarla'},
  'Leer facturas o documentos':{disparador:'Llega un documento al correo',accion:'Se extraen los datos a tu hoja o sistema',revision:'Contabilidad valida las diferencias'},
  'Armar reportes':{disparador:'Llega la fecha del reporte',accion:'Se reúnen los datos y se prepara el resumen',revision:'El responsable lo aprueba antes de compartirlo'},
};
const PIEZAS={
  'Video de producto':{ia:'Guion, variantes y apoyo en la edición',equipo:'Dirección, grabación y aprobación final'},
  'Fotos de producto':{ia:'Fondos, escenarios y versiones por canal',equipo:'Producto real, fidelidad y aprobación final'},
  'Reels o contenido para redes':{ia:'Ideas, subtítulos y adaptaciones',equipo:'Mensaje, tono de marca y publicación'},
  'Campaña completa':{ia:'Variantes de texto y de piezas para probar',equipo:'Estrategia, presupuesto y lectura de resultados'},
};
const OBJETIVOS={'Vender un producto':'Una pieza principal con llamado a comprar o escribir','Explicar un servicio':'Una pieza que explique el proceso y el siguiente paso','Dar a conocer la marca':'Una serie corta con un mismo mensaje'};
const ACTIVOS={'Una o dos personas':'Una sesión práctica enfocada','Un equipo pequeño':'Un taller por área con ejercicios','Varias áreas':'Un programa por módulos con seguimiento'};
const AREAS={
  'Ventas':'Preparar propuestas y responder objeciones',
  'Marketing':'Crear borradores y adaptar contenido',
  'Operaciones':'Ordenar procesos y documentar tareas',
  'Dirección':'Definir reglas de uso y prioridades',
};
const NIVELES={
  'Apenas empezamos':'Criterio y seguridad',
  'Lo usamos sin reglas claras':'Guía de uso para el equipo',
  'Ya lo usamos a diario':'Aplicación y seguimiento',
};
const WEB=[
  {id:'oferta',texto:'¿Se entiende en segundos qué vendes y para quién?',pendiente:'Aclarar la oferta en la primera pantalla'},
  {id:'movil',texto:'¿Carga rápido en un celular?',pendiente:'Mejorar la carga en móvil'},
  {id:'contacto',texto:'¿Contactarte toma un solo paso?',pendiente:'Dejar un siguiente paso claro'},
  {id:'google',texto:'¿Tus páginas de servicio aparecen en Google?',pendiente:'Revisar la indexación de tus servicios'},
  {id:'datos',texto:'¿Tienes datos estructurados en tus páginas?',pendiente:'Agregar datos estructurados'},
  {id:'medir',texto:'¿Sabes cuántos contactos llegan desde la web?',pendiente:'Medir los contactos por canal'},
];
const SI_NO=['Sí','No','No lo sé'];

export const SOLUCION_LABS={
  'automatizacion-procesos-ia':{
    eyebrow:'Laboratorio · Automatización',titulo:'Diseña tu primer flujo',descripcion:'Elige una tarea y mira cómo se reparte entre el sistema y tu equipo.',panel:'Tu primer flujo',
    preguntas:[{id:'tarea',texto:'¿Qué tarea repites más?',opciones:Object.keys(FLUJOS)}],
    numeros:[{id:'veces',label:'Veces por semana',min:1,max:100,step:1,valor:20,sufijo:''},{id:'minutos',label:'Minutos cada vez',min:1,max:60,step:1,valor:10,sufijo:' min'}],
    resultado(r,n){
      const flujo=FLUJOS[r.tarea];
      return {titular:r.tarea||'Elige una tarea',subtitulo:flujo?'Un flujo pequeño y verificable':'Tu flujo aparecerá aquí',destacado:{label:'Tiempo que hoy toma al mes',valor:`${horasMes(n.veces,n.minutos)} horas`},filas:[['Inicia cuando',flujo?.disparador||'—'],['El sistema',flujo?.accion||'—'],['Tu equipo',flujo?.revision||'—']],lista:{titulo:'Antes de automatizar',items:['Definir qué datos entran','Listar las excepciones','Decidir quién confirma']}};
    },
    mensaje:(r,n)=>[`Tarea: ${r.tarea}.`,`Hoy: unas ${n.veces} veces por semana, ${n.minutos} minutos cada vez.`],
  },
  'contenido-video-ia':{
    eyebrow:'Laboratorio · Contenido',titulo:'Arma el brief de tu pieza',descripcion:'Dos respuestas y ves qué apoya la IA y qué sigue en manos de tu marca.',panel:'Tu brief',
    preguntas:[{id:'pieza',texto:'¿Qué necesitas producir?',opciones:Object.keys(PIEZAS)},{id:'objetivo',texto:'¿Qué debe lograr?',opciones:Object.keys(OBJETIVOS)}],
    resultado(r){
      const pieza=PIEZAS[r.pieza];
      return {titular:r.pieza||'Elige una pieza',subtitulo:r.objetivo||'Tu brief aparecerá aquí',destacado:{label:'Punto de partida',valor:OBJETIVOS[r.objetivo]||'Pendiente'},filas:[['Apoya la IA',pieza?.ia||'—'],['Decide tu equipo',pieza?.equipo||'—']],lista:{titulo:'Para empezar necesitamos',items:['Producto o servicio real','Tu identidad de marca','El canal donde se publicará']}};
    },
    mensaje:r=>[`Pieza: ${r.pieza}.`,`Objetivo: ${r.objetivo}.`],
  },
  'sitios-web-seo-geo':{
    eyebrow:'Laboratorio · Web',titulo:'Revisa tu web en seis preguntas',descripcion:'Una revisión rápida para saber por dónde empezar. No analiza tu sitio ni lo reemplaza un diagnóstico.',panel:'Tu revisión',
    preguntas:WEB.map(item=>({id:item.id,texto:item.texto,opciones:SI_NO})),
    resultado(r){
      const respondidas=WEB.filter(item=>r[item.id]),listas=respondidas.filter(item=>r[item.id]==='Sí'),pendientes=respondidas.filter(item=>r[item.id]!=='Sí');
      return {titular:respondidas.length?`${listas.length} de ${WEB.length} en orden`:'Empieza la revisión',subtitulo:respondidas.length===WEB.length?'Según tus respuestas':`${respondidas.length} de ${WEB.length} preguntas`,destacado:{label:'Por dónde empezar',valor:pendientes[0]?.pendiente||(respondidas.length===WEB.length?'Medir y seguir mejorando':'Pendiente')},filas:[['Respondiste sí',String(listas.length)],['Por revisar',String(pendientes.length)]],lista:{titulo:'Pendientes',items:pendientes.map(item=>item.pendiente)}};
    },
    mensaje:r=>{const pendientes=WEB.filter(item=>r[item.id]&&r[item.id]!=='Sí').map(item=>item.pendiente);return [`Revisé mi web: ${WEB.filter(item=>r[item.id]==='Sí').length} de ${WEB.length} en orden.`,...(pendientes.length?[`Por revisar: ${pendientes.join('; ')}.`]:[])];},
  },
  'capacitacion-ia-empresas':{
    eyebrow:'Laboratorio · Capacitación',titulo:'Encuentra el punto de partida de tu equipo',descripcion:'Tres respuestas para orientar el formato del taller.',panel:'Tu punto de partida',
    preguntas:[{id:'quienes',texto:'¿A quién quieres capacitar?',opciones:Object.keys(ACTIVOS)},{id:'area',texto:'¿Qué área empieza?',opciones:Object.keys(AREAS)},{id:'nivel',texto:'¿Cómo usan la IA hoy?',opciones:Object.keys(NIVELES)}],
    resultado(r){
      return {titular:r.area||'Elige un área',subtitulo:r.nivel||'Tu punto de partida aparecerá aquí',destacado:{label:'Formato sugerido',valor:ACTIVOS[r.quienes]||'Pendiente'},filas:[['Módulo inicial',NIVELES[r.nivel]||'—'],['Primer ejercicio',AREAS[r.area]||'—']],lista:{titulo:'Lo que queda en tu equipo',items:['Guía de uso','Ejercicios con tus procesos','Plan de adopción']}};
    },
    mensaje:r=>[`Equipo: ${r.quienes}.`,`Área: ${r.area}.`,`Uso actual: ${r.nivel}.`],
  },
};
export const labInicial=slug=>{
  const lab=SOLUCION_LABS[slug];
  if(!lab) throw new Error('Laboratorio no disponible.');
  return {respuestas:{},numeros:Object.fromEntries((lab.numeros||[]).map(item=>[item.id,item.valor])),paso:0};
};
export function labResponder(slug,estado,valor){
  const lab=SOLUCION_LABS[slug],pregunta=lab?.preguntas[estado.paso];
  if(!pregunta||!pregunta.opciones.includes(valor)) throw new Error('Respuesta no válida.');
  return {...estado,respuestas:{...estado.respuestas,[pregunta.id]:valor},paso:estado.paso+1};
}
export const labTerminado=(slug,estado)=>estado.paso>=SOLUCION_LABS[slug].preguntas.length;
export function labWhatsapp(slug,nombre,estado){
  const lab=SOLUCION_LABS[slug];
  if(!lab) throw new Error('Laboratorio no disponible.');
  const summary=['Hola, probé el laboratorio de EdicionAular.com.','',`Solución: ${nombre}.`,...(labTerminado(slug,estado)?lab.mensaje(estado.respuestas,estado.numeros):[]),'','Quiero conversar sobre el siguiente paso para mi negocio.'].join('\n');
  return {summary,whatsapp:`https://wa.me/573002730128?text=${encodeURIComponent(summary)}`};
}
