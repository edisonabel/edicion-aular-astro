import { login, logout, getUser, getSettings, handleAuthCallback, acceptInvite, requestPasswordRecovery, updateUser, refreshSession } from '@netlify/identity';
import { cleanArticle } from './editorial.mjs';
import { editorialRevision, revisionSource } from './editorial-status.mjs';

const $ = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state=null, selected=null, dirty=false, busy=false, invitation=null, recovery=false;
let libraryView='suggestions', verification=0, lastSent=null;
const liveVersions=new Map();
let previewObserver;
$('preview').addEventListener('load',()=>{previewObserver?.disconnect();const body=$('preview').contentDocument?.body;if(body){const resize=()=>{$('preview').style.height=Math.ceil(body.scrollHeight+48)+'px';};previewObserver=new ResizeObserver(resize);previewObserver.observe(body);resize();}});
function setTheme(theme){ document.documentElement.dataset.theme=theme; $('theme').textContent=theme==='dark'?'Modo claro':'Modo oscuro'; $('theme').setAttribute('aria-label',theme==='dark'?'Cambiar a modo claro':'Cambiar a modo oscuro'); }
let initialTheme;try{initialTheme=localStorage.getItem('theme');}catch{}
setTheme(initialTheme==='light'||initialTheme==='dark'?initialTheme:window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
$('theme').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('theme',theme);}catch{}preview();});

const message = (text,error=false,title=error?'Revisa este paso':'Información') => { $('message').textContent=text; $('message').dataset.error=String(error);$('notice').dataset.error=String(error);$('notice-title').textContent=title;$('notice').hidden=!text;if($('publish-dialog').open&&error){$('publish-error').textContent=text;$('publish-error').hidden=false;} };
$('dismiss-notice').addEventListener('click',()=>{$('notice').hidden=true;});
const lock = value => {busy=value; for(const id of ['save','review','reload','publish','show-suggestions','show-pending','show-published','draft-picker','logout'])$(id).disabled=value; if(!value){$('review').disabled=!selected||selected.published||dirty;checkReview();}};
const publicUrl=d=>`${location.origin}/blog/${d.post.slug}/`;
const isLive=d=>liveVersions.get(d.key)===revisionSource(d.post);
function statusText(d){return !d.published?'Borrador pendiente de envío':isLive(d)?'Publicado en la web':'Enviado · comprobando publicación';}
function appendPublicLink(url){const a=document.createElement('a');a.href=url;a.textContent='Ver artículo en la web ↗';a.target='_blank';a.rel='noopener noreferrer';$('message').append(a);}
function renderList(preferredKey) {
  $('show-suggestions').textContent=`Sugerencias (${(state.suggestions||[]).length})`;
  $('show-suggestions').setAttribute('aria-pressed',String(libraryView==='suggestions'));
  $('suggestions').hidden=libraryView!=='suggestions';
  if(libraryView==='suggestions'){renderSuggestions();return;}
  const pending=state.drafts.filter(d=>!d.published),sent=state.drafts.filter(d=>d.published);
  $('show-pending').textContent=`Pendientes (${pending.length})`;$('show-published').textContent=`Publicaciones (${sent.length})`;
  $('show-pending').setAttribute('aria-pressed',String(libraryView==='pending'));$('show-published').setAttribute('aria-pressed',String(libraryView==='published'));
  $('list-heading').textContent=libraryView==='pending'?'Pendientes de envío':'Publicaciones enviadas';
  const items=libraryView==='pending'?pending:sent;
  $('draft-list').replaceChildren();$('draft-picker').replaceChildren();$('picker-label').hidden=!items.length;
  for(const d of items){const option=document.createElement('option');option.value=d.key;option.textContent=d.post.title;$('draft-picker').append(option);const b=document.createElement('button');b.type='button';b.dataset.key=d.key;b.append(document.createTextNode(d.post.title));const small=document.createElement('small');small.textContent=statusText(d);b.append(small);b.addEventListener('click',()=>choose(d.key));$('draft-list').append(b);}
  $('empty-list').hidden=!!items.length;
  $('empty-heading').textContent=libraryView==='pending'?'No hay artículos listos para revisar.':'Todavía no hay publicaciones enviadas.';
  $('empty-description').textContent=libraryView==='pending'?'Consulta Sugerencias para ver los temas del radar. Los artículos ya enviados están en Publicaciones.':'Revisa un borrador en Pendientes y envíalo cuando esté listo.';
  const item=items.find(d=>d.key===preferredKey)||items[0];
  if(item)choose(item.key,true);else{selected=null;$('editor').hidden=true;$('preview').srcdoc='';previewObserver?.disconnect();}
}
function renderSuggestions(){
  selected=null;$('editor').hidden=true;$('preview').srcdoc='';previewObserver?.disconnect();
  $('draft-list').replaceChildren();$('draft-picker').replaceChildren();$('picker-label').hidden=true;
  $('show-pending').textContent=`Pendientes (${state.drafts.filter(d=>!d.published).length})`;
  $('show-published').textContent=`Publicaciones (${state.drafts.filter(d=>d.published).length})`;
  for(const id of ['show-pending','show-published'])$(id).setAttribute('aria-pressed','false');
  $('list-heading').textContent='Radar editorial';
  const items=state.suggestions||[];$('empty-list').hidden=!!items.length;$('suggestion-cards').replaceChildren();
  $('empty-heading').textContent='Todavía no hay sugerencias sincronizadas.';
  $('empty-description').textContent='El radar se revisa los lunes y jueves. Los artículos publicados siguen disponibles en Publicaciones.';
  for(const item of items){
    const card=document.createElement('article');card.className='suggestion-card';
    const add=(tag,value,css)=>{const el=document.createElement(tag);el.textContent=value;if(css)el.className=css;card.append(el);return el;};
    add('p',`${item.receivedOn} · ${item.kind==='trend'?'Señal de Google Trends':'Novedad de fuente oficial'}`,'eyebrow');
    add('h2',item.angle);add('p',item.summary);add('p',item.title,'source-title');
    const a=add('a','Leer la fuente original ↗');a.href=item.link;a.target='_blank';a.rel='noopener noreferrer';
    add('p',`${item.source} · Fecha de la fuente: ${item.date}`,'small');
    add('h3','Antes de convertirlo en artículo');const ul=document.createElement('ul');for(const check of item.checks){const li=document.createElement('li');li.textContent=check;ul.append(li);}card.append(ul);
    const copy=add('button','Copiar ficha para desarrollar');copy.type='button';copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText([item.angle,item.summary,'Fuente: '+item.link,...item.checks.map(x=>'• '+x)].join('\n\n'));message('La ficha está copiada. Requiere desarrollar el texto y elegir una portada antes de cargarlo para publicación.',false,'Ficha copiada');}catch{message('No se pudo copiar la ficha. Puedes seleccionar su texto.',true);}});
    $('suggestion-cards').append(card);
  }
}
$('show-suggestions').addEventListener('click',()=>switchLibrary('suggestions'));
function switchLibrary(view){if(busy||(dirty&&!window.confirm('¿Descartar los cambios sin guardar y cambiar de listado?')))return;dirty=false;libraryView=view;renderList();lock(false);}
$('show-pending').addEventListener('click',()=>switchLibrary('pending'));
$('show-published').addEventListener('click',()=>switchLibrary('published'));
async function verifyPublications(attempt=0,generation=++verification){
  const items=(state?.drafts||[]).filter(d=>d.published);
  await Promise.allSettled(items.map(async d=>{
    try{const expected=await editorialRevision(d.post),response=await fetch(publicUrl(d),{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(7000)});if(!response.ok)return;const doc=new DOMParser().parseFromString(await response.text(),'text/html');if(doc.querySelector('meta[name="editorial-revision"]')?.content!==expected)return;if(generation!==verification)return;liveVersions.set(d.key,revisionSource(d.post));
      for(const button of $('draft-list').children)if(button.dataset.key===d.key)button.querySelector('small').textContent='Publicado en la web';
      if(selected?.key===d.key)$('entry-status').textContent='Publicado en la web. Esta versión ya está disponible para tus lectores.';
      if(lastSent===d.key&&!dirty){message('La versión enviada ya está disponible en el blog.',false,'Publicado correctamente');appendPublicLink(publicUrl(d));lastSent=null;}
    }catch{/* A missing or slow public page is not a failed GitHub commit. */}
  }));
  if(generation===verification&&attempt<7&&items.some(d=>!isLive(d)))setTimeout(()=>{if(generation===verification)verifyPublications(attempt+1,generation);},10000);
}
async function api(body) {
  await refreshSession();
  const response = await fetch('/api/editorial',{method:body?'POST':'GET',credentials:'same-origin',cache:'no-store',headers:body?{'Content-Type':'application/json'}:{},...(body?{body:JSON.stringify(body)}:{})});
  let result;try{result=await response.json();}catch{throw new Error('No se pudo confirmar la respuesta. Conserva tu texto antes de recargar.');}
  if(!response.ok)throw new Error(result.error||'No se pudo completar la operación.');
  return result;
}
const editedPost = () => ({...selected.post,title:$('post-title').value,excerpt:$('post-excerpt').value,content:$('post-content').value});
function preview() {
  if(!selected)return;
  const p=editedPost();
  const dark=document.documentElement.dataset.theme==='dark';
  $('preview').srcdoc=`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${location.origin}; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><style>body{font:17px/1.9 system-ui,sans-serif;margin:0;background:${dark?'#1a1c24':'#fff'};color:${dark?'#eeeeF4':'#24242c'}}article{max-width:750px;padding:32px 24px;margin:auto}h1{font-size:clamp(27px,4vw,40px);line-height:1.18;letter-spacing:-.035em}h2{font-size:25px;line-height:1.4;margin-top:2.5em}h3{font-size:21px;line-height:1.4}p,li{overflow-wrap:anywhere}a{color:${dark?'#ff75a8':'#b80046'}}img{width:100%;height:auto;border-radius:12px}figure{margin:2rem 0}figcaption,.meta{font-size:12px;opacity:.8}.excerpt{border-left:3px solid #b80046;padding-left:20px}table{display:block;overflow:auto;border-collapse:collapse;font-size:14px}td,th{padding:12px;border:1px solid #7776}th{text-align:left}code{overflow-wrap:anywhere}li{margin:.6em 0}</style></head><body><article><p class="meta">VISTA PREVIA · ${selected.kind==='update'?'Actualización de una guía existente':'Artículo nuevo'}</p><h1>${escape(p.title)}</h1><p class="meta">Por Edison Aular · Marketing con IA</p><figure><img src="${location.origin}${escape(p.image)}" alt="${escape(p.imageAlt)}"><figcaption>Imagen ilustrativa generada con IA.</figcaption></figure><p class="excerpt">${escape(p.excerpt)}</p>${cleanArticle(p.content)}</article></body></html>`;
}
function tab(id) {
  const previewMode=id==='preview';
  for(const name of ['preview','edit']) { const active=name===id; $('tab-'+name).setAttribute('aria-selected',String(active));$('tab-'+name).tabIndex=active?0:-1;$(name+'-panel').hidden=!active; }
  if(previewMode)preview();
}
function choose(key,internal=false) {
  if(busy&&!internal)return;
  if(dirty&&!window.confirm('Hay cambios sin guardar. ¿Quieres descartarlos y abrir otro artículo?')){$('draft-picker').value=selected.key;return;}
  selected=state.drafts.find(d=>d.key===key);dirty=false;$('draft-picker').value=key;
  $('editor').hidden=false;$('editor-heading').textContent=selected.post.title;
  $('entry-kind').textContent=selected.published?'PUBLICACIÓN ENVIADA':selected.kind==='update'?'ACTUALIZAR · SE CONSERVA LA URL':'NUEVO ARTÍCULO';
  $('entry-status').textContent=selected.published?(isLive(selected)?'Publicado en la web. Esta versión ya está disponible para tus lectores.':'Envío confirmado. Comprobando que Netlify haya actualizado la web.'):'Borrador pendiente de envío.';
  $('public-link').hidden=!selected.published;$('public-link').href=publicUrl(selected);
  $('review').disabled=selected.published;$('review').textContent=selected.published?'Esta versión ya fue enviada':selected.kind==='update'?'Revisar actualización':'Revisar y publicar';
  $('post-title').value=selected.post.title;$('post-excerpt').value=selected.post.excerpt;$('post-content').value=selected.post.content;
  $('dirty-note').textContent='';$('source-list').replaceChildren();
  for(const source of selected.sources){const li=document.createElement('li'),a=document.createElement('a');a.textContent=source.title;a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);$('source-list').append(li);}
  for(const button of $('draft-list').children)button.setAttribute('aria-current',String(button.dataset.key===key));
  tab('preview');
}
async function load(preferredKey) {
  lock(true);
  try {
    state=await api();$('login-panel').hidden=true;$('workspace').hidden=false;$('logout').hidden=false;
    dirty=false;if(preferredKey){const item=state.drafts.find(d=>d.key===preferredKey);if(item)libraryView=item.published?'published':'pending';}
    renderList(preferredKey);message('');verifyPublications();return true;
  }catch(err){message(err.message,true);}finally{lock(false);}
}
$('draft-picker').addEventListener('change',()=>choose($('draft-picker').value));
for(const id of ['post-title','post-excerpt','post-content'])$(id).addEventListener('input',()=>{dirty=true;$('dirty-note').textContent='Tienes cambios sin guardar. Guarda el borrador antes de enviarlo.';$('review').disabled=true;});
for(const name of ['preview','edit']) {
  $('tab-'+name).addEventListener('click',()=>tab(name));
  $('tab-'+name).addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const next=['ArrowLeft','Home'].includes(event.key)?'preview':'edit';tab(next);$('tab-'+next).focus();}});
}
$('reload').addEventListener('click',async()=>{if(!dirty||window.confirm('¿Descartar los cambios sin guardar y actualizar el listado?')){const ok=await load(selected?.key);if(ok)message('Se actualizaron los pendientes y las publicaciones enviadas.',false,'Listado actualizado');}});
$('save').addEventListener('click',async()=>{
  if(busy)return;lock(true);
  try{const result=await api({action:'save',key:selected.key,revision:state.revision,post:editedPost()});if(!result.saved)throw new Error('No se confirmó el guardado.');const key=selected.key;liveVersions.delete(key);dirty=false;const ok=await load(key);if(ok)message(selected?.published?'Esta versión ya coincide con el envío realizado.':'Los cambios están en Pendientes. Todavía no se enviaron a publicar.',false,'Borrador guardado');}catch(err){message(err.message,true);}finally{lock(false);}
});
function checkReview(){ $('publish').disabled=busy||!['sources','content','image'].every(x=>$('check-'+x).checked); }
for(const item of ['sources','content','image'])$('check-'+item).addEventListener('change',checkReview);
$('review').addEventListener('click',()=>{
  if(dirty){message('Guarda primero el borrador para revisar y publicar exactamente esa versión.',true);return;}
  if(!selected||selected.published)return;
  preview();$('publish-error').hidden=true;for(const item of ['sources','content','image'])$('check-'+item).checked=false;
  $('publish-summary').textContent=selected.kind==='update'?'Se actualizará esta guía conservando su dirección y fecha de publicación original.':'Se añadirá este artículo al blog. Los artículos anteriores se conservan.';
  $('publish').textContent=selected.kind==='update'?'Publicar actualización':'Publicar artículo';checkReview();$('publish-dialog').showModal();
});
$('publish').addEventListener('click',async()=>{
  if(busy||$('publish').disabled)return;lock(true);$('publish').textContent='Enviando…';$('publish-dialog').setAttribute('aria-busy','true');
  try{
    const result=await api({action:'publish',key:selected.key,revision:state.revision,blogRevision:state.blogRevision,post:editedPost(),review:{sources:$('check-sources').checked,content:$('check-content').checked,image:$('check-image').checked}});
    if(!result.committed)throw new Error('No se confirmó la publicación.');
    const sent=selected;dirty=false;lastSent=sent.key;sent.published=true;liveVersions.delete(sent.key);$('publish-dialog').close();
    libraryView='pending';renderList();message('El artículo pasó a Publicaciones. Netlify está actualizando la web; no necesitas volver a enviarlo.',false,result.alreadyPublished?'Este envío ya estaba confirmado':'Enviado correctamente');appendPublicLink(result.url);$('notice').focus({preventScroll:true});
    // The commit is confirmed even if refreshing metadata fails afterwards.
    try{state=await api();renderList();}catch{/* Keep the confirmed article out of Pending. */}verifyPublications();
  }catch(err){message(err.message,true);}finally{$('publish-dialog').removeAttribute('aria-busy');$('publish').textContent=selected?.kind==='update'?'Publicar actualización':'Publicar artículo';lock(false);}
});
$('login-form').addEventListener('submit',async event=>{
  event.preventDefault();const button=$('login-form').querySelector('button');button.disabled=true;message('Comprobando acceso…');
  try{await login($('login-email').value,$('login-password').value);$('login-password').value='';await load();}catch{message('No se pudo iniciar sesión. Revisa tu acceso o utiliza la recuperación.',true);}finally{button.disabled=false;}
});
$('invite-form').addEventListener('submit',async event=>{
  event.preventDefault();const password=$('invite-password').value;
  if(password!==$('invite-confirm').value){message('Las contraseñas deben coincidir.',true);return;}
  try{if(recovery)await updateUser({password});else await acceptInvite(invitation,password);invitation=null;$('invite-password').value='';$('invite-confirm').value='';$('invite-form').hidden=true;await load();}catch{message('No se pudo activar el acceso. Comprueba que la invitación sigue vigente.',true);}
});
$('recovery').addEventListener('click',async()=>{try{await requestPasswordRecovery($('login-email').value);message('Si tu cuenta está registrada, recibirás el enlace de recuperación.');}catch{message('No se pudo solicitar la recuperación. Inténtalo más tarde.',true);}});
$('logout').addEventListener('click',async()=>{if(dirty&&!window.confirm('¿Salir y descartar los cambios sin guardar?'))return;await logout();verification++;lastSent=null;liveVersions.clear();state=null;selected=null;dirty=false;$('workspace').hidden=true;$('logout').hidden=true;$('login-panel').hidden=false;$('preview').srcdoc='';$('draft-list').replaceChildren();message('Sesión cerrada.');});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
async function init(){
  try{
    // An older public offline worker cached all GETs. Update it before any auth request.
    if('serviceWorker' in navigator){
      const registration=await navigator.serviceWorker.getRegistration('/');
      if(registration){
        const previous=navigator.serviceWorker.controller;
        await registration.update();
        const installing=registration.installing||registration.waiting;
        if(installing)await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('Actualiza la página antes de iniciar sesión.')),12000);const check=()=>{if(installing.state==='activated'){clearTimeout(timeout);resolve();}else if(installing.state==='redundant'){clearTimeout(timeout);reject(new Error('No se pudo actualizar la conexión privada.'));}};installing.addEventListener('statechange',check);check();});
        if(previous&&installing&&navigator.serviceWorker.controller===previous)await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('Actualiza la página antes de iniciar sesión.')),5000);navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(timeout);resolve();},{once:true});});
      }
    }
    const callback=await handleAuthCallback();
    if(callback?.type==='invite'||callback?.type==='recovery'){invitation=callback.token;recovery=callback.type==='recovery';$('login-form').hidden=true;$('invite-form').hidden=false;$('recovery').hidden=true;message(recovery?'Elige una nueva contraseña.':'Tu invitación está lista. Crea una contraseña para entrar.');return;}
    const user=await getUser();if(user)await load();else await getSettings();
  }catch{message('El acceso editorial está pendiente de activación. Tus artículos públicos siguen disponibles.',true);}
}
init();
