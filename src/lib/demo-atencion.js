// Demo por reglas: sin modelo, almacenamiento ni solicitudes de red. El motor es puro para poder cambiarlo por un modelo real.
export const DEMO_DEFAULT='clinicas-estetica';
export const DEMO_ETAPAS=['Atraer','Responder','Agendar','Confirmar','Cuidar','Volver','Medir'];
export const normalizar=texto=>String(texto||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const contiene=(texto,claves)=>claves.some(clave=>texto.includes(clave));
const opcion=(label,...claves)=>({label,claves});
const capital=texto=>`${texto[0].toUpperCase()}${texto.slice(1)}`;
const URGENCIA={label:'Tengo una urgencia',claves:[],urgent:true};
export const DEMO_ESPECIALIDADES=[
  { id:'odontologia', label:'Odontología', motivos:[opcion('Valoración general','valoracion','revision','chequeo'),opcion('Limpieza dental','limpieza','profilaxis','blanqueamiento'),opcion('Ortodoncia','ortodoncia','bracket','frenillo','alineador'),opcion('Implantes','implante','corona','protesis'),URGENCIA] },
  { id:'estetica', label:'Medicina estética', motivos:[opcion('Valoración estética','valoracion','asesoria'),opcion('Limpieza facial','limpieza','facial','acne'),opcion('Toxina botulínica','botox','toxina','arruga'),opcion('Depilación láser','depilacion','laser'),URGENCIA] },
  { id:'dermatologia', label:'Dermatología', motivos:[opcion('Consulta dermatológica','consulta','dermatolog','piel'),opcion('Tratamiento de acné','acne','grano'),opcion('Revisión de lunares','lunar','mancha'),opcion('Caída del cabello','cabello','caida','capilar'),URGENCIA] },
  { id:'general', label:'Medicina general', motivos:[opcion('Consulta general','consulta','medico','chequeo'),opcion('Control','control','seguimiento'),opcion('Exámenes','examen','laboratorio','resultado'),opcion('Certificado médico','certificado','incapacidad'),URGENCIA] },
  { id:'fisioterapia', label:'Fisioterapia', dolorEsMotivo:true, motivos:[opcion('Valoración inicial','valoracion'),opcion('Lesión deportiva','lesion','deport','esguince'),opcion('Dolor de espalda o cuello','espalda','lumbar','cuello','dolor','duele'),opcion('Rehabilitación','rehabilitacion','postoperatorio','operacion'),URGENCIA] },
  { id:'psicologia', label:'Psicología', motivos:[opcion('Primera consulta','primera','consulta'),opcion('Terapia individual','individual','ansiedad','estres','depresion'),opcion('Terapia de pareja','pareja'),opcion('Consulta para mi hijo o hija','hijo','hija','nino'),URGENCIA] },
];
export const DEMO_SECTORS=[
  { id:'clinicas-estetica', label:'Salud y estética', receptor:'recepción', salud:true, de:'de la clínica', persona:'paciente', evento:'cita', cuidado:'las indicaciones que aprobó tu especialista', retorno:'tu control' },
  { id:'inmobiliarias', label:'Inmobiliaria', receptor:'un asesor', de:'de la inmobiliaria', persona:'cliente', evento:'visita', cuidado:'los documentos y los siguientes pasos', retorno:'una nueva opción para ti', pasos:[
    { key:'Busca', text:'¿Qué estás buscando?', options:[opcion('Comprar','comprar','compra'),opcion('Arrendar','arrendar','arriendo','alquil'),opcion('Vender mi inmueble','vender','venta')] },
    { key:'Zona', text:'Perfecto. ¿En qué zona te interesa?', options:[opcion('El Poblado','poblado'),opcion('Laureles','laureles'),opcion('Envigado','envigado')] },
    { key:'Visita', text:'Busquemos un espacio para la visita. ¿Cuál te sirve?', agenda:true, cold:opcion('Solo estoy mirando','solo estoy mirando','mirando','todavia no') },
  ]},
  { id:'turismo-hoteles', label:'Hotel o turismo', receptor:'recepción', de:'del hotel', persona:'huésped', evento:'reserva', cuidado:'la información de tu estadía', retorno:'tu próxima estadía', pasos:[
    { key:'Viaje', text:'¿Para cuándo es tu viaje?', options:[opcion('Este fin de semana','fin de semana'),opcion('Este mes','este mes'),{...opcion('Aún sin fecha','sin fecha','no se','todavia'),cold:true}] },
    { key:'Personas', text:'¿Cuántas personas viajan?', options:[opcion('1 o 2','una persona','dos personas','pareja'),opcion('3 o 4','tres','cuatro','familia'),opcion('Grupo grande','grupo')] },
    { key:'Le importa', text:'¿Qué te importa más?', options:[opcion('Mejor precio','barato','economico'),opcion('Ubicación','centro','cerca'),opcion('Plan completo','plan','completo','todo incluido')] },
  ]},
  { id:'servicios', label:'Empresa de servicios', receptor:'una persona del equipo', de:'de la empresa', persona:'cliente', evento:'visita', cuidado:'los siguientes pasos', retorno:'tu próximo servicio', pasos:[
    { key:'Necesidad', text:'¿Qué necesitas?', options:[opcion('Una cotización','cotiza','presupuesto'),opcion('Agendar una visita','visita','agendar'),{...opcion('Solo información','informacion','solo quiero saber'),cold:true}] },
    { key:'Visita', text:'Busquemos un espacio. ¿Cuál te sirve?', agenda:true, cold:opcion('Sin prisa','sin prisa','mas adelante') },
    { key:'Contacto', text:'¿Cómo prefieres que te contactemos?', options:[opcion('Por WhatsApp','whatsapp'),opcion('Por llamada','llamada','llamar','telefono')] },
  ]},
];
export const getDemoSector=id=>DEMO_SECTORS.find(sector=>sector.id===id);
export const getDemoEspecialidad=id=>DEMO_ESPECIALIDADES.find(item=>item.id===id);
export const limpiarNegocio=texto=>String(texto||'').replace(/[^\p{L}\p{N} .&'-]/gu,' ').replace(/\s+/g,' ').trim().slice(0,40);

const DIAS=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const HORAS=[['9:00 a. m.','manana'],['2:30 p. m.','tarde'],['11:00 a. m.','manana']];
// Tres espacios de ejemplo en los próximos días, sin domingos, a partir de la fecha del visitante.
export function demoHorarios(ahora=new Date()){
  const horarios=[],dia=new Date(ahora);
  while(horarios.length<3){
    dia.setDate(dia.getDate()+1);
    if(dia.getDay()===0) continue;
    const [hora,franja]=HORAS[horarios.length],nombre=DIAS[dia.getDay()];
    horarios.push({label:`${capital(nombre)} ${dia.getDate()}, ${hora}`,claves:[normalizar(nombre),franja]});
  }
  return horarios;
}
function demoPasos(state){
  const sector=getDemoSector(state.sectorId);
  const pasos=sector.salud?[
    { key:'Motivo', text:'¿En qué te podemos ayudar?', options:getDemoEspecialidad(state.especialidadId).motivos },
    { key:'Cita', text:'Busquemos un espacio. ¿Cuál te sirve?', agenda:true },
    { key:'Paciente', text:'Anotado. ¿Es tu primera visita?', options:[opcion('Sí, primera vez','primera','nunca','si'),opcion('Ya soy paciente','ya soy','ya he','no')] },
  ]:sector.pasos;
  return pasos.map(paso=>paso.agenda?{...paso,options:[...demoHorarios(new Date(state.ahora)),...(paso.cold?[{...paso.cold,cold:true}]:[])]}:paso);
}
const EMERGENCIA=['no puedo respirar','dolor en el pecho','desmay','infarto','convuls','sangrado abundante','no para de sangrar','suicid','quitarme la vida','hacerme dano'];
const URGENTE=['urgente','urgencia','emergencia','inflam','hinch','sangr','fiebre','infeccion'];
const DOLOR=['dolor','duele'];
const SIN_DOLOR=/\b(sin|no tengo|no me|no hay)\b[^.,]*\b(dolor|duele|urgencia)\b/;
const CONSEJO=['que me tomo','que tomo','medicamento','pastilla','dosis','receta','diagnostic','es normal','es grave','puedo tomar'];
const PERSONA=['asesor','una persona','humano','hablar con','llamenme','llamame','recepcionista'];
const INFO=[
  { id:'precio', claves:['precio','cuesta','cuanto vale','valor','costo','tarifa'], reply:'El valor depende de la valoración. Aquí respondo con la información que tu equipo apruebe.', evento:'Detectó interés en el precio' },
  { id:'lugar', claves:['donde','ubicacion','direccion','horario','abren','atienden','parqueadero'], reply:'Aquí respondo con la dirección y los horarios de tu negocio.', evento:'Respondió sobre ubicación u horarios' },
  { id:'pago', claves:['eps','seguro','prepagada','financia','cuotas','tarjeta','forma de pago'], reply:'Aquí respondo con tus convenios y formas de pago aprobados.', evento:'Respondió sobre convenios y pagos' },
];
const SALUDOS=['hola','buenas','buenos dias','buen dia'];
const matchOpcion=(paso,texto)=>paso.options.find(item=>normalizar(item.label)===texto)||paso.options.find(item=>item.claves?.length&&contiene(texto,item.claves));
function salida(state,replies){
  const paso=state.fin?null:demoPasos(state)[state.paso];
  return {state,replies,quick:paso?paso.options.map(item=>item.label):[],pasos:demoPasos(state).map(item=>item.key)};
}
function cerrar(state,replies,prioridad){
  const receptor=getDemoSector(state.sectorId).receptor;
  return salida({...state,fin:true,prioridad,eventos:[...state.eventos,'Preparó la ficha',`Avisó a ${receptor}`]},replies);
}
export function demoIniciar({sectorId=DEMO_DEFAULT,especialidadId=DEMO_ESPECIALIDADES[0].id,negocio=''}={},ahora=new Date()){
  if(!getDemoSector(sectorId)) throw new Error('Sector no disponible.');
  if(getDemoSector(sectorId).salud&&!getDemoEspecialidad(especialidadId)) throw new Error('Especialidad no disponible.');
  const state={sectorId,especialidadId,negocio:limpiarNegocio(negocio),ahora:ahora.toISOString(),paso:0,ficha:{},fin:false,prioridad:'',eventos:[],dudas:0,frio:false,cita:'',motivo:''};
  return salida(state,[`Hola, soy el asistente ${state.negocio?`de ${state.negocio}`:getDemoSector(state.sectorId).de}. ${demoPasos(state)[0].text}`]);
}
export function demoResponder(previo,entrada){
  const sector=getDemoSector(previo.sectorId),especialidad=getDemoEspecialidad(previo.especialidadId),receptor=sector.receptor;
  const state={...previo,ficha:{...previo.ficha},eventos:[...previo.eventos]},texto=normalizar(entrada);
  if(state.fin) return salida(state,[`${capital(receptor)} ya tiene tu solicitud y te responderá por aquí.`]);
  const paso=demoPasos(state)[state.paso];
  if(!texto) return salida(state,[paso.text]);
  const elegida=paso.options.find(item=>normalizar(item.label)===texto);
  if(sector.salud&&contiene(texto,EMERGENCIA)){
    state.ficha.Motivo=state.ficha.Motivo||'Posible emergencia';state.eventos.push('Detectó una posible emergencia');
    return cerrar(state,[`Esto necesita atención de una persona ahora. Si estás en peligro, llama a la línea de emergencias 123. También le aviso a ${receptor}.`],'Urgente: atender ahora');
  }
  const sinDolor=SIN_DOLOR.test(texto),dolor=!sinDolor&&!especialidad?.dolorEsMotivo&&contiene(texto,DOLOR);
  if(sector.salud&&(elegida?.urgent||dolor||(!sinDolor&&contiene(texto,URGENTE)))){
    state.ficha.Motivo=state.ficha.Motivo||'Urgencia';state.eventos.push('Detectó una urgencia');
    return cerrar(state,[`No puedo darte indicaciones de salud. Ya le avisé a ${receptor} para que una persona te atienda ahora.`],'Urgente: atender ahora');
  }
  if(sector.salud&&contiene(texto,CONSEJO)){
    state.ficha.Motivo=state.ficha.Motivo||'Pregunta de salud';state.eventos.push('Evitó responder una pregunta de salud');
    return cerrar(state,[`Esa pregunta debe responderla una persona del equipo, no un asistente. Ya le avisé a ${receptor}.`],'Una persona debe responder');
  }
  if(contiene(texto,PERSONA)){
    state.eventos.push('Pasó la conversación a una persona');
    return cerrar(state,[`Claro. Ya le avisé a ${receptor} para que continúe contigo por aquí.`],'Una persona debe responder');
  }
  const infos=elegida?[]:INFO.filter(item=>contiene(texto,item.claves));
  infos.forEach(item=>state.eventos.push(item.evento));
  const respuestas=infos.map(item=>item.reply),final=elegida||matchOpcion(paso,texto);
  if(!final){
    if(infos.length) return salida(state,[...respuestas,paso.text]);
    if(contiene(texto,SALUDOS)) return salida(state,[`Hola. ${paso.text}`]);
    state.dudas++;
    if(state.dudas>=2){
      state.eventos.push('Pasó a una persona al no entender');
      return cerrar(state,[`Prefiero no responderte mal. Ya le avisé a ${receptor} para que una persona te ayude.`],'Una persona debe responder');
    }
    return salida(state,[`No estoy seguro de haber entendido. ${paso.text} También puedes escribir "asesor".`]);
  }
  state.dudas=0;state.ficha[paso.key]=final.label;
  if(final.cold) state.frio=true;
  if(state.paso===0){state.motivo=final.label;state.eventos.push(`Identificó: ${final.label}`);}
  if(paso.agenda&&!final.cold){state.cita=final.label;state.eventos.push('Propuso horarios y anotó la preferencia');}
  state.paso++;
  const pasos=demoPasos(state);
  if(state.paso<pasos.length) return salida(state,[...respuestas,pasos[state.paso].text]);
  const cierre=state.cita?`Listo. Dejé pedido tu espacio para el ${state.cita.toLowerCase()} ${capital(receptor)} lo confirma.`:`Listo. Ya le pasé tu solicitud a ${receptor}. Te confirmarán pronto.`;
  return cerrar(state,[...respuestas,cierre],state.frio?'Seguimiento':'Atender hoy');
}
// Lo que sigue después del primer contacto. Toda persona recibe la invitación a opinar: no se filtra por satisfacción.
export const DEMO_RECORRIDO=['confirmar','cuidar','volver'];
export function demoEtapa(id,state){
  const sector=getDemoSector(state.sectorId),evento=sector.evento,cuando=state.cita?`el ${state.cita.toLowerCase()}`:'la fecha acordada',motivo=sector.salud&&state.motivo&&!/urgencia/i.test(state.motivo)?` de ${state.motivo.toLowerCase()}`:'';
  if(id==='confirmar') return { etapa:'Confirmar', dia:'Un día antes', text:`Hola. Te recuerdo tu ${evento}${motivo} para ${cuando}${state.cita?'':'.'} ¿Confirmas?`, opciones:{
    'Confirmo':{reply:'Perfecto. Te esperamos.',ficha:'Confirmada',eventos:[`Confirmó la ${evento}`]},
    'No puedo ir':{reply:`Sin problema. Te propongo otro espacio y le ofrezco este a quien está en lista de espera.`,ficha:'Reprogramada',eventos:[`Reprogramó la ${evento}`,'Ofreció el espacio a la lista de espera']},
  }, campo:'Asistencia' };
  if(id==='cuidar') return { etapa:'Cuidar', dia:'Después de la atención', text:`Gracias por venir. Aquí tienes ${sector.cuidado}. ¿Cómo te fue?`, opciones:{
    'Muy bien':{reply:'Me alegra. ¿Nos ayudas con tu opinión en Google? Aquí está el enlace.',ficha:'Buena; opinión solicitada',eventos:['Envió lo aprobado por el equipo','Invitó a opinar en Google']},
    'Tuve un inconveniente':{reply:'Lamento eso. Ya le avisé al responsable para que te contacte. También puedes dejar tu opinión en Google con este enlace.',ficha:'Revisar; responsable avisado',eventos:['Envió lo aprobado por el equipo','Alertó al responsable','Invitó a opinar en Google']},
  }, campo:'Experiencia' };
  if(id==='volver') return { etapa:'Volver', dia:'Meses después', text:`Hola. Ya es momento de pensar en ${sector.retorno}. ¿Te busco un espacio?`, opciones:{
    'Sí, búscame uno':{reply:'Listo. Te propongo los espacios disponibles.',ficha:'Volvió a agendar',eventos:[`Recuperó a la persona para una nueva ${evento}`]},
    'Ahora no':{reply:'Sin problema. No te escribiré de nuevo sobre esto por ahora.',ficha:'Pausado por decisión de la persona',eventos:['Respetó la decisión y pausó los mensajes']},
  }, campo:'Regreso' };
  throw new Error('Etapa no disponible.');
}
// Solo aritmética con los datos del visitante: no estima una mejora ni promete resultados.
export function demoFugas({consultas,agendan,noAsisten,valor}){
  const citas=Math.round(consultas*agendan/100),perdidas=Math.round(citas*noAsisten/100),sinCita=Math.max(consultas-citas,0);
  return {citas,sinCita,perdidas,atendidas:citas-perdidas,valorPerdido:perdidas*valor,valorPorCita:valor};
}
export function demoWhatsapp({sectorId,especialidadId,negocio}={},uso){
  const sector=getDemoSector(sectorId);
  if(!sector) throw new Error('Sector no disponible.');
  const tipo=sector.salud&&getDemoEspecialidad(especialidadId)?`${sector.label}, ${getDemoEspecialidad(especialidadId).label}`:sector.label,nombre=limpiarNegocio(negocio);
  const summary=['Hola, probé el sistema de pacientes en EdicionAular.com.','',...(nombre?[`Mi negocio: ${nombre}.`]:[]),`Tipo de negocio: ${tipo}.`,...(uso?[`Con mis números: ${uso.consultas} consultas al mes, ${uso.agendan} % agenda y ${uso.noAsisten} % no asiste.`]:[]),'','Quiero saber cómo sería este sistema para mi negocio.'].join('\n');
  return {summary,whatsapp:`https://wa.me/573002730128?text=${encodeURIComponent(summary)}`};
}
