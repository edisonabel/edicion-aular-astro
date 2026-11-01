import test from 'node:test';
import assert from 'node:assert/strict';
import { SOLUCION_LABS, labInicial, labResponder, labTerminado, labWhatsapp } from '../src/lib/solucion-lab.js';
function recorridos(slug,estado=labInicial(slug)){
  if(labTerminado(slug,estado)) return [estado];
  return SOLUCION_LABS[slug].preguntas[estado.paso].opciones.flatMap(valor=>recorridos(slug,labResponder(slug,estado,valor)));
}
test('cada recorrido de cada laboratorio entrega un resultado completo y un enlace exacto',()=>{
  for(const slug of Object.keys(SOLUCION_LABS)){
    const lab=SOLUCION_LABS[slug];
    for(const estado of slug==='sitios-web-seo-geo'?[0,1,2].map(i=>lab.preguntas.reduce((actual,p)=>labResponder(slug,actual,p.opciones[i]),labInicial(slug))):recorridos(slug)){
      const r=lab.resultado(estado.respuestas,estado.numeros);
      assert.ok(r.titular);assert.ok(r.destacado.valor);assert.ok(r.filas.length);
      const texto=JSON.stringify(r);assert.ok(!texto.includes('undefined'));assert.ok(!texto.includes('NaN'));
      const {summary,whatsapp}=labWhatsapp(slug,'Prueba',estado),url=new URL(whatsapp);
      assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/573002730128');assert.equal(url.searchParams.get('text'),summary);
      assert.ok(!summary.includes('undefined'));
    }
  }
});
test('el resultado se puede mostrar antes de responder',()=>{
  for(const slug of Object.keys(SOLUCION_LABS)){
    const estado=labInicial(slug),r=SOLUCION_LABS[slug].resultado(estado.respuestas,estado.numeros);
    assert.ok(r.titular);assert.ok(!JSON.stringify(r).includes('undefined'));
    assert.ok(!labWhatsapp(slug,'Prueba',estado).summary.includes('undefined'));
  }
});
test('la automatización calcula con los números del visitante',()=>{
  const slug='automatizacion-procesos-ia',estado=labResponder(slug,labInicial(slug),'Armar reportes');
  const r=SOLUCION_LABS[slug].resultado(estado.respuestas,{veces:20,minutos:10});
  assert.equal(r.destacado.valor,'14 horas');assert.equal(r.titular,'Armar reportes');
});
test('la revisión web prioriza el primer pendiente y no da nada por hecho',()=>{
  const slug='sitios-web-seo-geo',lab=SOLUCION_LABS[slug];
  const todo=valor=>lab.preguntas.reduce(actual=>labResponder(slug,actual,valor),labInicial(slug));
  assert.equal(lab.resultado(todo('Sí').respuestas).titular,'6 de 6 en orden');
  assert.equal(lab.resultado(todo('No lo sé').respuestas).titular,'0 de 6 en orden');
  const parcial=labResponder(slug,labResponder(slug,labInicial(slug),'Sí'),'No');
  assert.equal(lab.resultado(parcial.respuestas).destacado.valor,'Mejorar la carga en móvil');
});
test('rechaza respuestas y laboratorios no válidos',()=>{
  assert.throws(()=>labInicial('inexistente'));assert.throws(()=>labWhatsapp('inexistente','x',{}));
  assert.throws(()=>labResponder('contenido-video-ia',labInicial('contenido-video-ia'),'Otra cosa'));
});
