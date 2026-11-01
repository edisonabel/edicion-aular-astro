import test from 'node:test';
import assert from 'node:assert/strict';
import { DEMO_DEFAULT, DEMO_SECTORS, demoAvanzar, demoCierre, demoHoras, demoWhatsapp, getDemoSector } from '../src/lib/demo-atencion.js';
function recorridos(sector,labels=[]){
  const {terminado,step}=demoAvanzar(sector.id,labels);
  return terminado?[labels]:step.options.flatMap(option=>recorridos(sector,[...labels,option.label]));
}
test('todo recorrido de cada sector termina con un mensaje y una prioridad',()=>{
  for(const sector of DEMO_SECTORS)for(const labels of recorridos(sector)){
    const {priority,text}=demoCierre(sector.id,labels);
    assert.ok(priority);assert.ok(text.includes(sector.receptor));
  }
});
test('la demo empieza por la clínica y una urgencia pasa de inmediato a una persona',()=>{
  assert.equal(getDemoSector(DEMO_DEFAULT).label,'Clínica odontológica');
  const urgencia=getDemoSector(DEMO_DEFAULT).steps[0].options.find(option=>option.urgent).label;
  const avance=demoAvanzar(DEMO_DEFAULT,[urgencia]);
  assert.equal(avance.terminado,true);assert.equal(avance.step,null);
  const cierre=demoCierre(DEMO_DEFAULT,[urgencia]);
  assert.match(cierre.priority,/^Urgente/);assert.match(cierre.text,/No puedo darte indicaciones de salud/);
});
test('una respuesta sin intención inmediata queda para seguimiento',()=>{
  assert.equal(demoCierre('inmobiliarias',['Comprar','Laureles','Solo estoy mirando']).priority,'Seguimiento');
  assert.equal(demoCierre('inmobiliarias',['Comprar','Laureles','Este mes']).priority,'Atender hoy');
});
test('rechaza sectores, respuestas y cierres no válidos',()=>{
  assert.throws(()=>demoAvanzar('inexistente',[]));
  assert.throws(()=>demoAvanzar(DEMO_DEFAULT,['Otra cosa']));
  assert.throws(()=>demoCierre(DEMO_DEFAULT,[]));
  assert.throws(()=>demoWhatsapp('inexistente'));
});
test('el enlace lleva el resumen exacto y los números solo si el visitante los indicó',()=>{
  const base=demoWhatsapp(DEMO_DEFAULT),url=new URL(base.whatsapp);
  assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/573002730128');
  assert.equal(url.searchParams.get('text'),base.summary);assert.ok(!base.summary.includes('consultas al día'));
  assert.ok(demoWhatsapp(DEMO_DEFAULT,{consultas:20,minutos:4}).summary.includes('unas 20 consultas al día'));
});
test('las horas se calculan con los números indicados',()=>{
  assert.equal(demoHoras(20,4),35);assert.equal(demoHoras(100,15),650);
});
