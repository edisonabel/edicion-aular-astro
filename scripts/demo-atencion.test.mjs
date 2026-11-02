import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_DEFAULT, DEMO_ESPECIALIDADES, DEMO_RECORRIDO, DEMO_SECTORS, demoEtapa, demoFugas, demoHorarios, demoIniciar, demoResponder, demoWhatsapp, fundadorasWhatsapp, limpiarNegocio } from '../src/lib/demo-atencion.js';
const AHORA=new Date(2026,10,1,12);
const salud=especialidadId=>demoIniciar({sectorId:DEMO_DEFAULT,especialidadId},AHORA);
const decir=(inicio,...textos)=>textos.reduce((actual,texto)=>demoResponder(actual.state,texto),inicio);
function recorridos(actual){
  if(actual.state.fin) return [actual];
  return actual.quick.flatMap(label=>recorridos(demoResponder(actual.state,label)));
}
const inicios=()=>[...DEMO_ESPECIALIDADES.map(item=>salud(item.id)),...DEMO_SECTORS.filter(item=>!item.salud).map(item=>demoIniciar({sectorId:item.id},AHORA))];
test('todo recorrido por botones de cada sector y especialidad termina con prioridad y ficha',()=>{
  for(const inicio of inicios())for(const final of recorridos(inicio)){
    assert.ok(final.state.prioridad);assert.ok(Object.keys(final.state.ficha).length);assert.ok(final.replies.at(-1).length>10);
    assert.ok(final.state.eventos.includes('Preparó la ficha'));
  }
});
test('salud cubre más que odontología y el saludo usa el nombre del negocio',()=>{
  assert.ok(DEMO_ESPECIALIDADES.length>=6);assert.ok(DEMO_ESPECIALIDADES.some(item=>item.id==='estetica'));
  assert.match(demoIniciar({especialidadId:'estetica',negocio:'Clínica Vital'},AHORA).replies[0],/asistente de Clínica Vital/);
  assert.ok(salud('estetica').quick.includes('Toxina botulínica'));
});
test('el texto libre entiende el motivo y el precio en la misma frase',()=>{
  const r=decir(salud('estetica'),'¿Cuánto cuesta el botox?');
  assert.equal(r.state.ficha.Motivo,'Toxina botulínica');assert.match(r.replies[0],/valor/);assert.match(r.replies[1],/espacio/);
  assert.ok(r.state.eventos.includes('Detectó interés en el precio'));
});
test('los saludos y los botones se leen bien en cada sector',()=>{
  assert.match(demoIniciar({sectorId:'turismo-hoteles'},AHORA).replies[0],/asistente del hotel\./);
  const r=decir(demoIniciar({sectorId:'turismo-hoteles'},AHORA),'Este mes','3 o 4','Ubicación');
  assert.equal(r.replies.length,1);assert.equal(r.state.ficha['Le importa'],'Ubicación');
});
test('una pregunta de información no avanza el paso y lo vuelve a preguntar',()=>{
  const r=decir(salud('odontologia'),'¿dónde quedan?');
  assert.equal(r.state.paso,0);assert.equal(r.replies.length,2);assert.ok(!r.state.fin);
});
test('dolor y urgencias pasan a una persona, sin dar indicaciones de salud',()=>{
  for(const frase of ['me duele mucho una muela','tengo una urgencia','se me inflamó la cara']){
    const r=decir(salud('odontologia'),frase);
    assert.ok(r.state.fin);assert.match(r.state.prioridad,/^Urgente/);assert.match(r.replies[0],/No puedo darte indicaciones de salud/);
  }
  assert.equal(decir(salud('odontologia'),'no tengo dolor, quiero una limpieza').state.ficha.Motivo,'Limpieza dental');
});
test('una posible emergencia remite a la línea 123',()=>{
  for(const frase of ['tengo dolor en el pecho','quiero hacerme daño']){
    const r=decir(salud('psicologia'),frase);
    assert.ok(r.state.fin);assert.match(r.replies[0],/123/);assert.match(r.state.prioridad,/^Urgente/);
  }
});
test('en fisioterapia el dolor es un motivo de consulta y no una urgencia',()=>{
  const r=decir(salud('fisioterapia'),'me duele la espalda');
  assert.ok(!r.state.fin);assert.equal(r.state.ficha.Motivo,'Dolor de espalda o cuello');
});
test('no responde preguntas de salud y pasa a una persona si lo piden o si no entiende',()=>{
  assert.equal(decir(salud('general'),'¿qué me tomo para la gripa?').state.prioridad,'Una persona debe responder');
  assert.equal(decir(salud('general'),'quiero hablar con un asesor').state.prioridad,'Una persona debe responder');
  const dudas=decir(salud('general'),'xyzzy');
  assert.ok(!dudas.state.fin);assert.ok(decir(dudas,'qwerty').state.fin);
});
test('propone tres horarios futuros sin domingos y entiende la franja escrita',()=>{
  const horarios=demoHorarios(new Date(2026,10,7,12));
  assert.equal(horarios.length,3);assert.ok(horarios[0].label.startsWith('Lunes 9'));assert.ok(!horarios.some(item=>item.label.startsWith('Domingo')));
  const r=decir(salud('odontologia'),'una limpieza','por la tarde','ya soy paciente');
  assert.ok(r.state.fin);assert.match(r.state.ficha.Cita,/2:30 p\. m\./);assert.equal(r.state.ficha.Paciente,'Ya soy paciente');
  assert.equal(r.state.prioridad,'Atender hoy');assert.ok(!r.replies.at(-1).includes('..'));
});
test('sin intención inmediata queda para seguimiento',()=>{
  assert.equal(decir(demoIniciar({sectorId:'inmobiliarias'},AHORA),'Comprar','Laureles','Solo estoy mirando').state.prioridad,'Seguimiento');
});
test('el recorrido sigue con confirmar, cuidar y volver en todos los sectores, también tras una urgencia',()=>{
  const finales=[...inicios().flatMap(recorridos),decir(salud('odontologia'),'tengo una urgencia')];
  for(const final of finales)for(const id of DEMO_RECORRIDO){
    const etapa=demoEtapa(id,final.state);
    assert.ok(etapa.text.length>10);assert.ok(!etapa.text.includes('undefined'));assert.ok(!etapa.text.includes('el la '));assert.ok(!etapa.text.includes('..'));assert.ok(etapa.campo);
    for(const valor of Object.values(etapa.opciones)){assert.ok(valor.reply);assert.ok(valor.ficha);assert.ok(valor.eventos.length);}
  }
  assert.throws(()=>demoEtapa('inexistente',finales[0].state));
});
test('toda persona recibe la invitación a opinar, sin filtrar por satisfacción',()=>{
  const {opciones}=demoEtapa('cuidar',decir(salud('estetica'),'botox','tarde','primera').state);
  for(const valor of Object.values(opciones)) assert.match(valor.reply,/opini[oó]n en Google/);
  assert.ok(opciones['Tuve un inconveniente'].eventos.includes('Alertó al responsable'));
});
test('un no asistir ofrece el espacio a la lista de espera',()=>{
  const {opciones}=demoEtapa('confirmar',decir(salud('estetica'),'botox','tarde','primera').state);
  assert.ok(opciones['No puedo ir'].eventos.includes('Ofreció el espacio a la lista de espera'));
});
test('el cálculo de fugas usa solo los números indicados',()=>{
  assert.deepEqual(demoFugas({consultas:200,agendan:40,noAsisten:20,valor:150000}),{citas:80,sinCita:120,perdidas:16,atendidas:64,valorPerdido:2400000,valorPorCita:150000});
  assert.equal(demoFugas({consultas:100,agendan:100,noAsisten:0,valor:1000}).valorPerdido,0);
});
test('rechaza valores no válidos y limpia el nombre del negocio',()=>{
  assert.throws(()=>demoIniciar({sectorId:'inexistente'}));assert.throws(()=>demoIniciar({especialidadId:'inexistente'}));assert.throws(()=>demoWhatsapp({sectorId:'inexistente'}));
  assert.equal(limpiarNegocio('  <b>Clínica</b>\n Vital & Spa '+'x'.repeat(60)).length,40);
  assert.ok(!limpiarNegocio('<script>').includes('<'));
});
test('el enlace lleva el resumen exacto y los datos solo si existen',()=>{
  const base=demoWhatsapp({sectorId:DEMO_DEFAULT,especialidadId:'estetica'}),url=new URL(base.whatsapp);
  assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/573002730128');assert.equal(url.searchParams.get('text'),base.summary);
  assert.ok(base.summary.includes('Salud y estética, Medicina estética'));assert.ok(!base.summary.includes('consultas al mes'));assert.ok(!base.summary.includes('Mi negocio:'));
  const lleno=demoWhatsapp({sectorId:DEMO_DEFAULT,especialidadId:'estetica',negocio:'Clínica Vital'},{consultas:200,agendan:40,noAsisten:20}).summary;
  assert.ok(lleno.includes('Mi negocio: Clínica Vital.'));assert.ok(lleno.includes('200 consultas al mes'));
});
test('la postulación de clínicas fundadoras lleva el mensaje exacto',()=>{
  const {summary,whatsapp}=fundadorasWhatsapp(),url=new URL(whatsapp);
  assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/573002730128');assert.equal(url.searchParams.get('text'),summary);
  assert.ok(summary.includes('clínica fundadora'));
});
