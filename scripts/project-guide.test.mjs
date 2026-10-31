import test from 'node:test';
import assert from 'node:assert/strict';
import { PROJECT_PATHS, recommendProject } from '../src/lib/project-guide.js';
test('las 21 situaciones llevan al servicio adecuado y a WhatsApp con el resumen exacto',()=>{
  for(const path of PROJECT_PATHS)for(const current of path.choices){
    const result=recommendProject({goal:path.id,current,context:'Tienda & equipo + agenda: ¿cómo mejorar?'});
    const url=new URL(result.whatsapp);
    assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,'/573002730128');
    assert.equal(url.searchParams.get('text'),result.summary);assert.equal(result.service,path.service);
    assert.ok(result.summary.includes(current));assert.ok(result.summary.includes('Tienda & equipo + agenda: ¿cómo mejorar?'));
  }
});
test('rechaza respuestas incompatibles y limita el contexto sin permitir saltos de líneas inyectados',()=>{
  assert.throws(()=>recommendProject({goal:'inexistente',current:'x'}));
  assert.throws(()=>recommendProject({goal:'web',current:PROJECT_PATHS[0].choices[0]}));
  const result=recommendProject({goal:'web',current:PROJECT_PATHS[2].choices[0],context:'  Hola\n\r\t'+ 'a'.repeat(500)});
  const line=result.summary.split('\n').find(line=>line.startsWith('Contexto'));
  assert.equal(line.replace('Contexto de mi proyecto: ','').length,360);
  assert.ok(!result.summary.includes('\r'));
});
