// Private editorial workspace. Uses the existing Netlify CLI login; never publishes.
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {homedir} from 'node:os';
import path from 'node:path';
import {getStore} from '@netlify/blobs';
import {validateDraft} from '../src/lib/editorial.mjs';
const root=process.cwd(),privateDir=path.join(root,'.netlify','editorial-workspace');
const cliPath=path.join(process.env.APPDATA||path.join(homedir(),'.config'),'netlify','Config','config.json');
const cli=JSON.parse(await readFile(cliPath,'utf8'));
const token=cli.users?.[cli.userId]?.auth?.token;
if(!token)throw new Error('Inicia sesión en Netlify CLI antes de preparar el espacio editorial.');
const store=getStore({name:'editorial-private',siteID:'abfde541-0dba-47b0-b618-e43d3f5d9bf1',token,consistency:'strong'});
const command=process.argv[2];
await mkdir(privateDir,{recursive:true});
if(command==='export'){
  const [saved,radar,requests]=await Promise.all([store.getWithMetadata('drafts',{type:'json',consistency:'strong'}),store.get('radar-suggestions',{type:'json',consistency:'strong'}),store.get('editorial-requests',{type:'json',consistency:'strong'})]);
  if(!saved?.etag||!Array.isArray(saved.data))throw new Error('No se pudo leer el archivo privado de borradores.');
  const snapshot={revision:saved.etag,drafts:saved.data,suggestions:radar?.items||[],requests:requests?.items||[]};
  await writeFile(path.join(privateDir,'snapshot.json'),JSON.stringify(snapshot,null,2));
  console.log(JSON.stringify({savedTo:path.join(privateDir,'snapshot.json'),drafts:saved.data.length,suggestions:snapshot.suggestions.length,requests:snapshot.requests.length}));
}else if(command==='import'){
  const filename=process.argv[3];if(!filename)throw new Error('Falta la ruta al JSON privado de artículos preparados.');
  const incoming=JSON.parse(await readFile(filename,'utf8'));
  if(!Array.isArray(incoming)||!incoming.length||incoming.length>20)throw new Error('Se requiere una lista de 1 a 20 artículos preparados.');
  const snapshot=JSON.parse(await readFile(path.join(privateDir,'snapshot.json'),'utf8'));
  const current=await store.getWithMetadata('drafts',{type:'json',consistency:'strong'});
  if(current?.etag!==snapshot.revision)throw new Error('Los borradores cambiaron. Exporta otra vez y revisa los cambios antes de importar.');
  const radar=await store.get('radar-suggestions',{type:'json',consistency:'strong'});
  const posts=JSON.parse(await readFile(path.join(root,'src','data','blog.json'),'utf8'));
  const next=current.data.slice(),keys=new Set(),sources=new Set();
  for(const input of incoming){
    const draft=validateDraft(input);
    if(keys.has(draft.key)||sources.has(draft.sourceKey))throw new Error('La importación contiene asociaciones duplicadas.');
    keys.add(draft.key);sources.add(draft.sourceKey);
    if(!draft.sourceKey||!radar?.items?.some(item=>item.key===draft.sourceKey))throw new Error('Falta vincular el artículo a una sugerencia existente.');
    await access(path.join(root,'public',draft.post.image));
    const index=next.findIndex(d=>d.key===draft.key);
    const sameSource=next.find(d=>d.sourceKey===draft.sourceKey);
    if(sameSource&&sameSource.key!==draft.key)throw new Error('Esta sugerencia ya tiene otro borrador.');
    if(index>=0&&next[index].post.slug!==draft.post.slug)throw new Error('No se permite cambiar la URL existente.');
    if(index<0&&next.some(d=>d.post.slug===draft.post.slug))throw new Error('La URL ya pertenece a otro borrador.');
    const published=posts.some(p=>p.slug===draft.post.slug);
    if(draft.kind==='new'&&published)throw new Error('La URL ya está publicada; prepara una actualización explícita.');
    if(draft.kind==='update'&&!published)throw new Error('La actualización no corresponde a una URL publicada.');
    if(index<0)next.push(draft);else next[index]=draft;
  }
  await writeFile(path.join(privateDir,'backup-'+Date.now()+'.json'),JSON.stringify(current.data,null,2));
  const result=await store.setJSON('drafts',next,{onlyIfMatch:current.etag});
  if(!result.modified)throw new Error('Hubo una edición simultánea. No se reemplazaron los borradores.');
  const verified=await store.get('drafts',{type:'json',consistency:'strong'});
  if(JSON.stringify(verified)!==JSON.stringify(next))throw new Error('El guardado requiere revisión: la lectura posterior no coincide.');
  console.log(JSON.stringify({saved:true,imported:incoming.length,total:next.length,published:false}));
}else throw new Error('Uso: node scripts/editorial-workspace.mjs export | import RUTA_JSON_PRIVADO');
