import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { cleanArticle, validateDraft, mergePublication, isEditor, DRAFT_KEY, BLOG_PATH } from '../src/lib/editorial.mjs';
import { createEditorialHandler } from '../netlify/functions/editorial.mjs';
// Public test fixtures only. Real unpublished drafts live in private Netlify Blobs.
const basePosts=JSON.parse(readFileSync('src/data/blog.json','utf8'));
const memory=basePosts.find(p=>p.slug==='memoria-agentes-ia-que-guardar');
const sourceRefs=[{title:'Documentación oficial de prueba',url:'https://docs.n8n.io/'},{title:'Guía oficial de prueba',url:'https://blog.n8n.io/'}];
const drafts=[{key:'test-new',kind:'new',sources:sourceRefs,post:{...memory,slug:'test-nuevo-articulo-editorial',title:'Artículo de prueba para el flujo editorial'}},{key:'test-update',kind:'update',targetSlug:memory.slug,sources:sourceRefs,post:{...memory,title:'Memoria en agentes de IA: actualización de prueba'}},{key:'test-second',kind:'new',sources:sourceRefs,post:{...memory,slug:'test-segundo-articulo-editorial',title:'Segundo artículo de prueba para el flujo editorial'}}];
// Simulate a first publication even after the real owner has published one of these drafts.
const newSlugs=new Set(drafts.filter(d=>d.kind==='new').map(d=>d.post.slug));
const originals=JSON.parse(readFileSync('src/data/blog.json','utf8')).filter(p=>!newSlugs.has(p.slug));
const editor={id:'owner-id',email:'edicionaular@gmail.com',roles:['editorial-admin']};
function fixture({user=editor,providerStatus=200,storeConflict=false}={}){
  let currentDrafts=structuredClone(drafts),posts=structuredClone(originals),draftRevision='draft1',blogRevision='blog1';const writes=[],draftWrites=[];let calls=0;
  const fetcher=async(url,options)=>{
    calls++;const path=new URL(url).pathname.split('/contents/')[1];
    assert.equal(path,BLOG_PATH);assert.equal(options.headers.Authorization,'Bearer fake-test-token');
    if(options.method==='PUT'){
      writes.push({path,body:JSON.parse(options.body)});
      if(providerStatus!==200)return Response.json({message:'provider failure'},{status:providerStatus});
      const body=JSON.parse(options.body),data=JSON.parse(Buffer.from(body.content,'base64').toString('utf8'));
      assert.equal(body.sha,blogRevision);posts=data;blogRevision='blog2';
      return Response.json({content:{sha:blogRevision},commit:{sha:'commit1'}});
    }
    return Response.json({type:'file',encoding:'base64',sha:blogRevision,content:Buffer.from(JSON.stringify(posts)).toString('base64')});
  };
  const store={getWithMetadata:async key=>{assert.equal(key,DRAFT_KEY);return{etag:draftRevision,data:structuredClone(currentDrafts)};},setJSON:async(key,value,options)=>{assert.equal(key,DRAFT_KEY);if(storeConflict||options.onlyIfMatch!==draftRevision)return{modified:false};currentDrafts=value;draftRevision='draft2';draftWrites.push(value);return{modified:true,etag:draftRevision};}};
  const handler=createEditorialHandler({user:async()=>user,fetcher,token:()=> 'fake-test-token',draftStore:()=>store});
  const request=body=>handler(new Request('https://edicionaular.com/api/editorial',body?{method:'POST',headers:{Origin:'https://edicionaular.com','Content-Type':'application/json'},body:JSON.stringify(body)}:{}));
  const publish=(i=0)=>({action:'publish',key:drafts[i].key,revision:draftRevision,blogRevision,post:drafts[i].post,review:{sources:true,content:true,image:true}});
  return{request,publish,writes,draftWrites,handler,get posts(){return posts},get calls(){return calls}};
}
test('los ejemplos editoriales tienen fuentes y contenido limpio; la actualización conserva su URL',()=>{
  for(const d of drafts){const valid=validateDraft(d);assert.ok(valid.sources.length>=2);assert.ok(!valid.post.content.includes('[COMPLETAR'));}
  assert.equal(drafts[1].post.slug,'memoria-agentes-ia-que-guardar');
});
test('el saneado retira scripts, atributos ejecutables, iframes y enlaces de protocolos peligrosos',()=>{
  const output=cleanArticle('<p onclick="steal()">Texto<a href="javascript:alert(1)">x</a><a href="//evil.example">y</a><a href="/blog/">ok</a></p><script>steal()</script><iframe src="https://evil.example"></iframe><img src=x onerror=steal()>');
  assert.ok(!/script|onclick|javascript:|iframe|onerror|evil\.example/.test(output));assert.ok(output.includes('href="/blog/"'));
});
test('publicar un artículo preserva íntegros todos los registros anteriores y asigna un ID nuevo',()=>{
  const next=mergePublication(originals,drafts[0],'2026-11-02');assert.equal(next.length,originals.length+1);assert.deepEqual(next.slice(0,-1),originals);assert.equal(next.at(-1).date,'2026-11-02');assert.ok(next.at(-1).id>Math.max(...originals.map(p=>p.id)));
});
test('actualizar conserva ID, URL y fecha original; los otros artículos no cambian',()=>{
  const next=mergePublication(originals,drafts[1],'2026-11-02');assert.equal(next.length,originals.length);
  for(let i=0;i<originals.length;i++)if(originals[i].slug!==drafts[1].targetSlug)assert.deepEqual(next[i],originals[i]);else{assert.equal(next[i].id,originals[i].id);assert.equal(next[i].date,originals[i].date);assert.equal(next[i].dateModified,'2026-11-02');}
});
test('usuarios anónimos, otra cuenta o rol de metadatos editables no pueden leer ni publicar',async()=>{
  for(const user of [null,{...editor,email:'other@example.com'},{...editor,roles:[],userMetadata:{roles:['editorial-admin']}}]){assert.equal(isEditor(user),false);const f=fixture({user});assert.equal((await f.request()).status,401);assert.equal((await f.request(f.publish())).status,401);assert.equal(f.calls,0);}
});
test('rechaza origen ajeno, revisión incompleta y versiones antiguas antes de escribir',async()=>{
  const f=fixture();assert.equal((await f.handler(new Request('https://edicionaular.com/api/editorial',{method:'POST',headers:{Origin:'https://evil.example','Content-Type':'application/json'},body:'{}'}))).status,403);
  assert.equal((await f.request({...f.publish(),revision:'old'})).status,409);
  assert.equal((await f.request({...f.publish(),blogRevision:'old'})).status,409);
  assert.equal((await f.request({...f.publish(),review:{sources:true}})).status,400);assert.equal(f.writes.length,0);
  assert.equal((await f.request({...f.publish(),post:{...drafts[0].post,title:'Un título modificado sin guardar'}})).status,409);assert.equal(f.writes.length,0);
});
test('guardar borrador no altera el archivo publicado y retira HTML inseguro',async()=>{
  const f=fixture();const body=f.publish();body.action='save';body.post={...body.post,content:body.post.content+'<script>alert(1)</script>'};const r=await f.request(body);assert.equal(r.status,200);assert.equal((await r.json()).saved,true);assert.deepEqual(f.posts,originals);assert.equal(f.writes.length,0);assert.equal(f.draftWrites.length,1);assert.ok(!f.draftWrites[0][0].post.content.includes('<script>'));
});
test('una edición simultánea del borrador no pisa la versión que se guardó antes',async()=>{
  const f=fixture({storeConflict:true});const body={...f.publish(),action:'save'};assert.equal((await f.request(body)).status,409);assert.equal(f.draftWrites.length,0);assert.equal(f.writes.length,0);
});
test('publicación confirmada escribe solo el archivo del blog; un reintento no duplica entradas',async()=>{
  const f=fixture();const first=await f.request(f.publish());assert.equal(first.status,200);const result=await first.json();assert.equal(result.committed,true);assert.ok(!JSON.stringify(result).includes('fake-test-token'));assert.equal(f.posts.length,originals.length+1);assert.equal(f.writes.length,1);const second=await f.request(f.publish());assert.equal((await second.json()).alreadyPublished,true);assert.equal(f.writes.length,1);
});
test('un conflicto o fallo del proveedor no anuncia publicación ni modifica datos',async()=>{
  for(const providerStatus of [409,500]){const f=fixture({providerStatus});const r=await f.request(f.publish());assert.equal(r.status,providerStatus===409?409:502);assert.ok(!(await r.json()).committed);assert.deepEqual(f.posts,originals);}
});
test('sin clave no ofrece publicación, no permite renombrar una URL y limita el cuerpo',async()=>{
  const h=createEditorialHandler({user:async()=>editor,token:()=>undefined});assert.equal((await h(new Request('https://edicionaular.com/api/editorial'))).status,503);
  const f=fixture();const body=f.publish();body.post={...body.post,slug:'otro-articulo'};assert.equal((await f.request(body)).status,400);
  const huge=new Request('https://edicionaular.com/api/editorial',{method:'POST',headers:{Origin:'https://edicionaular.com','Content-Type':'application/json'},body:'a'.repeat(160001)});assert.equal((await f.handler(huge)).status,413);assert.equal(f.writes.length,0);
});
test('el worker público no intercepta el panel, las API, Identity ni solicitudes autenticadas',()=>{
  const handlers={};const ctx=vm.createContext({URL,console,self:{location:{origin:'https://edicionaular.com'},addEventListener:(name,fn)=>handlers[name]=fn}});
  vm.runInContext(readFileSync('public/sw.js','utf8'),ctx);
  for(const path of ['/admin/','/api/editorial','/.netlify/identity/user']){
    let intercepted=false;handlers.fetch({request:new Request('https://edicionaular.com'+path),respondWith:()=>{intercepted=true}});assert.equal(intercepted,false,path);
  }
  let intercepted=false;handlers.fetch({request:new Request('https://edicionaular.com/any',{headers:{authorization:'Bearer test'}}),respondWith:()=>{intercepted=true}});assert.equal(intercepted,false);
});
