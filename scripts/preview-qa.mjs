// Visor local de QA. Solo sirve dist y un panel de revisión; nunca se publica.
// node scripts/preview-qa.mjs → http://localhost:4322/__qa/
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const report = JSON.parse(readFileSync('docs/auditoria-html.json', 'utf8'));
const blogPosts = JSON.parse(readFileSync('src/data/blog.json', 'utf8'));
const routes = ['/', '/blog/', ...blogPosts.map(post => `/blog/${post.slug}/`), '/contacto/', '/nosotros/', ...report.detalle.map(p => p.ruta)];
const harness = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Revisión visual · Edición Aular</title><style>
*{box-sizing:border-box}body{margin:0;background:#e9ebef;font:14px system-ui;color:#16191f}header{padding:12px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;background:white;border-bottom:1px solid #bcc1c9}button,select{font:inherit;padding:9px;border:1px solid #858b95;border-radius:5px;background:white;color:#16191f}button{cursor:pointer}button:focus-visible,select:focus-visible{outline:3px solid #b80046}#stage{display:flex;justify-content:center;padding:12px;overflow:auto}iframe{border:1px solid #858b95;height:800px;background:white;flex:none}#status{padding:10px 16px;background:#fff;white-space:pre-wrap;max-height:150px;overflow:auto;font-size:12px}label{display:flex;gap:6px;align-items:center}</style></head><body>
<header><strong>QA local</strong><label>Página<select id="route">${routes.map(r => `<option>${r}</option>`).join('')}</select></label><label>Ancho<select id="width"><option value="390">Móvil 390</option><option value="768">Tablet 768</option><option value="1200" selected>Escritorio 1200</option></select></label><button id="dark">Modo oscuro</button><button id="light">Modo claro</button><button id="faq">Probar FAQ</button><button id="check">Medir página</button></header>
<div id="status" role="status">Cargando…</div><div id="stage"><iframe id="site" title="Vista de la página" width="1200" src="${routes[0]}"></iframe></div>
<script>
const frame=document.querySelector('#site');let desired='dark';
function color(v){const m=v.match(/[\\d.]+/g);return m?m.map(Number):[0,0,0,0]}
function mix(f,b){const a=f.length>3?f[3]:1;return f.slice(0,3).map((x,i)=>x*a+b[i]*(1-a))}
function lum(rgb){return rgb.map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)}
function measure(){
 const d=frame.contentDocument,w=frame.contentWindow,page=d.querySelector('.geo-page, .blog-index, .blog-article') || d.querySelector('#bringer-main');if(!page)return;
 const visible=e=>{if(e.closest('details:not([open])')&&!e.closest('summary'))return false;for(let n=e;n;n=n.parentElement){const s=w.getComputedStyle(n);if(s.display==='none'||s.visibility==='hidden')return false}return e.getBoundingClientRect().width>0};
 const overflow=[...page.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return visible(e)&&(r.left< -2||r.right>d.documentElement.clientWidth+2)}).map(e=>({elemento:e.tagName+'.'+e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,transform:w.getComputedStyle(e).transform})).slice(0,8);
 const contrast=[];for(const e of page.querySelectorAll('p,h1,h2,h3,summary,a,.bringer-label')){if(!visible(e)||!e.textContent.trim())continue;const cs=w.getComputedStyle(e);let bg=[255,255,255];const ancestors=[];for(let n=e;n;n=n.parentElement)ancestors.unshift(n);let gradient=false;for(const n of ancestors){const s=w.getComputedStyle(n);if(s.backgroundImage!=='none')gradient=true;bg=mix(color(s.backgroundColor),bg)}if(gradient)continue;const fg=mix(color(cs.color),bg),a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);const large=parseFloat(cs.fontSize)>=24||(parseFloat(cs.fontSize)>=18.66&&parseInt(cs.fontWeight)>=700);if(ratio<(large?3:4.5))contrast.push({texto:e.textContent.trim().slice(0,60),ratio:Math.round(ratio*100)/100,color:cs.color,fondo:bg});}
 const fotos=[...page.querySelectorAll('[data-image-slot]')].map(figure=>{const img=figure.querySelector('img'),rect=figure.getBoundingClientRect();return {uso:figure.dataset.imageSlot,archivo:img?.getAttribute('src'),cargada:!!img?.naturalWidth,ancho:Math.round(rect.width),alto:Math.round(rect.height)}});
 const data={ruta:d.location.pathname,ancho:frame.width,tema:d.documentElement.classList.contains('light-mode')?'claro':'oscuro',secciones:page.querySelectorAll('section').length,faq:page.querySelectorAll('summary').length,fotos,desbordamientos:overflow,contraste:contrast,nota:'Animaciones desactivadas en este visor para medir la distribución. Contraste estimado en fondos planos; gradientes se revisan visualmente. Las fotos diferidas fuera de pantalla pueden figurar sin cargar.'};document.querySelector('#status').textContent=JSON.stringify(data,null,2);
}
function theme(value){desired=value;const d=frame.contentDocument;if(!d?.querySelector('#bringer-main'))return;const light=d.documentElement.classList.contains('light-mode');if(light!==(value==='light'))d.querySelector('.theme-toggle-button')?.click();setTimeout(measure,400)}
frame.addEventListener('load',()=>{
 const style=frame.contentDocument.createElement('style');style.textContent='html, body, body * {transition:none!important} #bringer-main [data-appear], #bringer-main [data-split-appear], #bringer-main [data-split-appear] * {transform:none!important;opacity:1!important;visibility:visible!important;animation:none!important;transition:none!important}';frame.contentDocument.head.appendChild(style);
 theme(desired);setTimeout(measure,1800)});
document.querySelector('#route').onchange=e=>{document.querySelector('#status').textContent='Cargando…';frame.src=e.target.value};
document.querySelector('#width').onchange=e=>{frame.width=e.target.value;setTimeout(measure,500)};
document.querySelector('#light').onclick=()=>theme('light');document.querySelector('#dark').onclick=()=>theme('dark');document.querySelector('#check').onclick=measure;
document.querySelector('#faq').onclick=()=>{const s=frame.contentDocument.querySelector('summary');s?.focus();s?.click();s?.scrollIntoView({block:'center'});setTimeout(measure,350)};
</script></body></html>`;
const mime = { '.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.mp4':'video/mp4','.xml':'application/xml','.txt':'text/plain' };
createServer((req,res)=>{
  const url = new URL(req.url, 'http://localhost:4322');
  if(url.pathname==='/__qa/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(harness);return;}
  if(/^\/mentoria\/?$/.test(url.pathname)){res.writeHead(301,{Location:'/servicios/'});res.end();return;}
  let file=resolve(root, '.'+decodeURIComponent(url.pathname));
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
  if(existsSync(file)&&statSync(file).isDirectory())file=resolve(file,'index.html');
  if(!existsSync(file)){res.writeHead(404);res.end('No encontrado');return;}
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(readFileSync(file));
}).listen(4322,'127.0.0.1',()=>console.log('QA: http://localhost:4322/__qa/'));
