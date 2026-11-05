import { createHmac, timingSafeEqual } from 'node:crypto';
import { getStore } from '@netlify/blobs';
export const RADAR_KEY='radar-suggestions';
export const radarStore=()=>getStore({name:'editorial-private',consistency:'strong'});
const hosts=new Set(['openai.com','blog.google','blog.n8n.io','trends.google.com','www.anthropic.com','www.kimi.com','kimi.com']);
const text=(s,max)=>{if(typeof s!=='string'||!s.trim()||s.length>max||/[<>\u0000-\u0008]/.test(s))throw new Error('Ficha no válida.');return s.trim();};
export function validateBatch(batch){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(batch?.date)||!Array.isArray(batch.items)||batch.items.length>3||!batch.items.length)throw new Error('Lote no válido.');
  return {date:batch.date,items:batch.items.map(item=>{
    const url=new URL(item.link);if(url.protocol!=='https:'||url.username||url.password||!hosts.has(url.hostname)||url.port)throw new Error('Fuente no permitida.');
    if(!Array.isArray(item.checks)||item.checks.length<1||item.checks.length>6)throw new Error('Faltan comprobaciones.');
    return {key:text(item.key,80),title:text(item.title,200),link:url.href,date:text(item.date,100),source:text(item.source,100),kind:item.kind==='trend'?'trend':'official',angle:text(item.angle,240),summary:text(item.summary,1200),checks:item.checks.map(s=>text(s,350)),receivedOn:batch.date};
  })};
}
export function createRadarHandler({store=radarStore,secret=()=>process.env.EDITORIAL_RADAR_SECRET,now=()=>Date.now()}={}){
  const reply=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
  return async req=>{
    if(req.method!=='POST')return reply({error:'Método no permitido.'},405);
    const key=secret();if(!key)return reply({error:'Radar pendiente de conexión.'},503);
    const time=req.headers.get('x-radar-time')||'',signature=req.headers.get('x-radar-signature')||'';
    if(!/^\d{13}$/.test(time)||Math.abs(now()-Number(time))>300000||!/^[a-f0-9]{64}$/.test(signature))return reply({error:'Solicitud no autorizada.'},401);
    if(req.headers.get('content-type')?.split(';')[0]!=='application/json')return reply({error:'Formato no permitido.'},415);
    try{
      const reader=req.body?.getReader();if(!reader)return reply({error:'Falta el lote.'},400);
      const chunks=[];let size=0;while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;if(size>30000){await reader.cancel();return reply({error:'Lote demasiado grande.'},413);}chunks.push(part.value);}
      const raw=Buffer.concat(chunks).toString('utf8'),expected=createHmac('sha256',key).update(time+'.'+raw).digest();
      if(!timingSafeEqual(expected,Buffer.from(signature,'hex')))return reply({error:'Solicitud no autorizada.'},401);
      const batch=validateBatch(JSON.parse(raw)),db=store();
      for(let attempt=0;attempt<3;attempt++){
        const saved=await db.getWithMetadata(RADAR_KEY,{type:'json',consistency:'strong'});
        const previous=saved?.data?.items||[],known=new Set(previous.map(x=>x.key)),urls=new Set(previous.map(x=>x.link)),added=batch.items.filter(x=>{if(known.has(x.key)||urls.has(x.link))return false;known.add(x.key);urls.add(x.link);return true;});
        if(!added.length)return reply({received:true,added:0});
        const items=[...added,...previous].sort((a,b)=>b.receivedOn.localeCompare(a.receivedOn)).slice(0,120);
        const result=await db.setJSON(RADAR_KEY,{items,lastReceived:batch.date},saved?.etag?{onlyIfMatch:saved.etag}:{onlyIfNew:true});
        if(result.modified)return reply({received:true,added:added.length});
      }
      return reply({error:'Otro lote se está guardando. Reintenta.'},409);
    }catch{return reply({error:'No se pudo guardar el lote.'},400);}
  };
}
export default createRadarHandler();
