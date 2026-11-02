import { getUser } from '@netlify/identity';
import { getStore } from '@netlify/blobs';
import { isEditor, validateDraft, mergePublication, sameArticle, BLOG_PATH, DRAFT_KEY, DRAFT_STORE } from '../lib/editorial.mjs';

const ORIGIN = 'https://edicionaular.com';
const BASE = 'https://api.github.com/repos/edisonabel/edicion-aular-astro/contents/';
const json = (body, status=200) => Response.json(body, { status, headers: { 'Cache-Control':'private, no-store', 'Vary':'Cookie, Authorization', 'X-Content-Type-Options':'nosniff' } });
export function createEditorialHandler({ user=getUser, fetcher=fetch, token=()=>process.env.EDITORIAL_GITHUB_TOKEN, draftStore=()=>getStore({name:DRAFT_STORE,consistency:'strong'}) }={}) {
  return async req => {
    if (!['GET','POST'].includes(req.method)) return json({error:'Método no permitido.'},405);
    if (req.method==='POST' && (req.headers.get('origin')!==ORIGIN || req.headers.get('content-type')?.split(';')[0]!=='application/json')) return json({error:'Solicitud no permitida.'},403);
    const editor = await user();
    if (!isEditor(editor)) return json({error:'Inicia sesión con tu cuenta editorial autorizada.'},401);
    const secret=token();
    if (!secret) return json({error:'La conexión de publicación está pendiente de activar.'},503);
    const github = async (path, options={}) => {
      const res=await fetcher(BASE+path+(options.method?'':'?ref=main'), { ...options, headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${secret}`,'X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},signal:AbortSignal.timeout(15000) });
      if (!res.ok) { const err=new Error(res.status===409 ? 'Hubo otro cambio. Recarga el listado antes de volver a guardar.' : 'No se pudo confirmar la operación con GitHub. Conserva tus cambios y vuelve a cargar el listado.'); err.status=res.status===409?409:502; throw err; }
      return res.json();
    };
    const read = async path => { const file=await github(path); if(file.type!=='file'||file.encoding!=='base64'||!file.sha)throw new Error('Formato de archivo no válido.'); return {sha:file.sha,data:JSON.parse(Buffer.from(file.content,'base64').toString('utf8'))}; };
    try {
      const store=draftStore(),stored=await store.getWithMetadata(DRAFT_KEY,{type:'json',consistency:'strong'});
      if(!stored?.etag||!Array.isArray(stored.data))return json({error:'Todavía no hay borradores cargados en el estudio.'},503);
      const drafts={sha:stored.etag,data:stored.data},blog=await read(BLOG_PATH);
      if (req.method==='GET') return json({revision:drafts.sha,blogRevision:blog.sha,drafts:drafts.data.map(d=>({...validateDraft(d),published:sameArticle(blog.data.find(p=>p.slug===d.post.slug),d)})),account:editor.email});
      // A bounded body prevents a valid session from accidentally posting oversized documents.
      const reader=req.body?.getReader(); let length=0, chunks=[];
      if(!reader)return json({error:'Falta el contenido.'},400);
      while(true){const {done,value}=await reader.read();if(done)break;length+=value.length;if(length>160000){await reader.cancel();return json({error:'El documento es demasiado grande.'},413);}chunks.push(value);}
      let body;try{body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return json({error:'Documento no válido.'},400);}
      if(!['save','publish'].includes(body.action)||body.revision!==drafts.sha)return json({error:'El borrador cambió. Recarga el listado antes de continuar.'},409);
      const index=drafts.data.findIndex(d=>d.key===body.key);if(index<0)return json({error:'Borrador no encontrado.'},404);
      const draft=validateDraft({...drafts.data[index],post:{...drafts.data[index].post,...body.post}});
      // Route and operation kind are immutable in the panel; updates cannot overwrite other articles.
      if(draft.post.slug!==drafts.data[index].post.slug)return json({error:'La URL del borrador debe conservarse.'},400);
      if(body.action==='save'){
        const next=drafts.data.slice();next[index]=draft;
        const result=await store.setJSON(DRAFT_KEY,next,{onlyIfMatch:drafts.sha});
        if(!result.modified)return json({error:'Otro cambio se guardó antes. Recarga el listado para conservar ambas versiones.'},409);
        return json({saved:true,revision:result.etag});
      }
      if(body.review?.sources!==true||body.review?.content!==true||body.review?.image!==true)return json({error:'Confirma las tres revisiones antes de publicar.'},400);
      if(JSON.stringify(draft.post)!==JSON.stringify(validateDraft(drafts.data[index]).post))return json({error:'Guarda primero los cambios del borrador y vuelve a revisarlo.'},409);
      if(body.blogRevision!==blog.sha)return json({error:'El blog cambió. Recarga antes de publicar.'},409);
      const current=blog.data.find(p=>p.slug===draft.post.slug);
      if(sameArticle(current,draft))return json({committed:true,alreadyPublished:true,url:`${ORIGIN}/blog/${draft.post.slug}/`});
      const posts=mergePublication(blog.data,draft);
      const result=await github(BLOG_PATH,{method:'PUT',body:JSON.stringify({message:`Publicar: ${draft.post.title}`,branch:'main',sha:blog.sha,content:Buffer.from(JSON.stringify(posts,null,2)+'\n').toString('base64')})});
      return json({committed:true,commit:result.commit.sha,url:`${ORIGIN}/blog/${draft.post.slug}/`,message:'Guardado en GitHub. Netlify está construyendo la web; comprueba la URL cuando termine.'});
    } catch(error) { return json({error:error.status?error.message:'No se pudo completar la operación. Conserva tus cambios y vuelve a cargar el listado.'},error.status||400); }
  };
}
export default createEditorialHandler();
export const config = { path:'/api/editorial', rateLimit:{windowLimit:30,windowSize:60,aggregateBy:['ip','domain']} };
