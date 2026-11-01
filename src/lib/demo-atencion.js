// Demo guiada por reglas: sin modelo, almacenamiento ni solicitudes de red.
export const DEMO_DEFAULT='clinicas-estetica';
export const DEMO_DIAS_MES=26;
const horarios=[{label:'Mañanas'},{label:'Tardes'},{label:'Sábados'}];
export const DEMO_SECTORS=[
  { id:'clinicas-estetica', label:'Clínica odontológica', receptor:'recepción', steps:[
    { key:'Motivo', text:'Hola, soy el asistente de la clínica. ¿En qué te podemos ayudar?', options:[{label:'Valoración general'},{label:'Limpieza dental'},{label:'Ortodoncia'},{label:'Tengo dolor o una urgencia',urgent:true}] },
    { key:'Horario', text:'Claro. Busquemos un espacio con el equipo. ¿Qué horario te sirve?', options:horarios },
    { key:'Paciente', text:'Anotado. ¿Es tu primera visita?', options:[{label:'Sí, primera vez'},{label:'Ya soy paciente'}] },
  ]},
  { id:'inmobiliarias', label:'Inmobiliaria', receptor:'un asesor', steps:[
    { key:'Busca', text:'Hola, soy el asistente de la inmobiliaria. ¿Qué estás buscando?', options:[{label:'Comprar'},{label:'Arrendar'},{label:'Vender mi inmueble'}] },
    { key:'Zona', text:'Perfecto. ¿En qué zona te interesa?', options:[{label:'El Poblado'},{label:'Laureles'},{label:'Envigado'}] },
    { key:'Plazo', text:'¿Para cuándo lo necesitas?', options:[{label:'Este mes'},{label:'En unos meses'},{label:'Solo estoy mirando',cold:true}] },
  ]},
  { id:'turismo-hoteles', label:'Hotel o turismo', receptor:'recepción', steps:[
    { key:'Viaje', text:'Hola, soy el asistente del hotel. ¿Para cuándo es tu viaje?', options:[{label:'Este fin de semana'},{label:'Este mes'},{label:'Aún sin fecha',cold:true}] },
    { key:'Personas', text:'¿Cuántas personas viajan?', options:[{label:'1 o 2'},{label:'3 o 4'},{label:'Grupo grande'}] },
    { key:'Prioridad del viajero', text:'¿Qué te importa más?', options:[{label:'Mejor precio'},{label:'Ubicación'},{label:'Plan completo'}] },
  ]},
  { id:'servicios', label:'Empresa de servicios', receptor:'una persona del equipo', steps:[
    { key:'Necesidad', text:'Hola, soy el asistente de la empresa. ¿Qué necesitas?', options:[{label:'Una cotización'},{label:'Agendar una visita'},{label:'Solo información',cold:true}] },
    { key:'Plazo', text:'Entendido. ¿Para cuándo lo necesitas?', options:[{label:'Esta semana'},{label:'Este mes'},{label:'Sin prisa',cold:true}] },
    { key:'Contacto', text:'¿Cómo prefieres que te contactemos?', options:[{label:'Por WhatsApp'},{label:'Por llamada'}] },
  ]},
];
export const getDemoSector=id=>DEMO_SECTORS.find(sector=>sector.id===id);
function validar(sector,labels){
  if(!sector) throw new Error('Sector no disponible.');
  return labels.map((label,index)=>{
    const step=sector.steps[index],option=step?.options.find(item=>item.label===label);
    if(!option) throw new Error('Respuesta no válida para este paso.');
    return {...option,key:step.key};
  });
}
// Una urgencia termina el flujo: el asistente no orienta sobre salud y lo pasa a una persona.
export function demoAvanzar(id,labels){
  const sector=getDemoSector(id),answers=validar(sector,labels),urgente=answers.some(item=>item.urgent);
  const terminado=urgente||answers.length===sector.steps.length;
  return {answers,terminado,urgente,step:terminado?null:sector.steps[answers.length]};
}
export function demoCierre(id,labels){
  const sector=getDemoSector(id),{answers,terminado,urgente}=demoAvanzar(id,labels);
  if(!terminado) throw new Error('La conversación aún no termina.');
  if(urgente) return {priority:'Urgente: atender ahora',text:`No puedo darte indicaciones de salud. Ya le avisé a ${sector.receptor} para que una persona te atienda ahora.`};
  const priority=answers.some(item=>item.cold)?'Seguimiento':'Atender hoy';
  return {priority,text:`Listo. Ya le pasé tu solicitud a ${sector.receptor}. Te confirmarán pronto.`};
}
export function demoHoras(consultas,minutos,dias=DEMO_DIAS_MES){
  return Math.round(consultas*minutos*dias/60);
}
export function demoWhatsapp(id,uso){
  const sector=getDemoSector(id);
  if(!sector) throw new Error('Sector no disponible.');
  const summary=['Hola, probé la demo de atención de EdicionAular.com.','',`Mi negocio se parece a: ${sector.label}.`,...(uso?[`Hoy recibimos unas ${uso.consultas} consultas al día y cada una toma unos ${uso.minutos} minutos.`]:[]),'','Quiero saber cómo sería algo así para mi negocio.'].join('\n');
  return {summary,whatsapp:`https://wa.me/573002730128?text=${encodeURIComponent(summary)}`};
}
