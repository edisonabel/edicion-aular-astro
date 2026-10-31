/** Radar editorial privado. Sin claves, modelos de IA, facturación ni publicación automática. */
const RADAR = Object.freeze({
  recipient: 'edicionaular@gmail.com', timezone: 'America/Bogota', maxItems: 3,
  feeds: [
    {name:'Google Trends · Colombia',url:'https://trends.google.com/trending/rss?geo=CO',kind:'trend'},
    {name:'Google · IA',url:'https://blog.google/innovation-and-ai/technology/ai/rss/',kind:'official'},
    {name:'n8n · blog oficial',url:'https://blog.n8n.io/rss/',kind:'official'},
    {name:'OpenAI · noticias oficiales',url:'https://openai.com/news/rss.xml',kind:'official'}
  ],
  blog:'https://edicionaular.com/rss.xml'
});

function instalarRadar() {
  // Idempotente: modifica únicamente los activadores de este radar en este proyecto.
  ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='ejecutarRadar').forEach(t=>ScriptApp.deleteTrigger(t));
  [ScriptApp.WeekDay.MONDAY,ScriptApp.WeekDay.THURSDAY].forEach(day=>{
    ScriptApp.newTrigger('ejecutarRadar').timeBased().everyWeeks(1).onWeekDay(day).atHour(9).inTimezone(RADAR.timezone).create();
  });
  console.log('Radar instalado: lunes y jueves entre 09:00 y 10:00 de Colombia. No se envió correo al instalar.');
}
function verificarRadar() {
  const report=recopilarRadar_();
  console.log(JSON.stringify({fuentes:report.sources,avisos:report.warnings,candidatos:report.candidates.slice(0,3).map(x=>({titulo:x.title,fuente:x.source,url:x.link})),publicados:report.published.length}));
}
function enviarPrimerInforme() { procesarRadar_(true); }
function ejecutarRadar() { procesarRadar_(false); }

function procesarRadar_(initial) {
  const lock=LockService.getScriptLock();
  if(!lock.tryLock(1000)) { console.log('Ya hay una revisión en curso.'); return; }
  try {
    const props=PropertiesService.getScriptProperties();
    const pending=props.getProperty('RADAR_PENDING');
    // Si el proceso se interrumpió durante un envío, no repetir automáticamente.
    if(pending) throw new Error('Envío pendiente de comprobación. Revisar correo antes de borrar RADAR_PENDING: '+pending);
    const report=recopilarRadar_();
    const state=JSON.parse(props.getProperty('RADAR_STATE')||'{"sent":[],"lastCheck":null}');
    const sent=new Set(state.sent);
    const selected=report.candidates.filter(x=>!sent.has(x.key)).slice(0,RADAR.maxItems);
    const now=new Date(),date=Utilities.formatDate(now,RADAR.timezone,'yyyy-MM-dd');
    state.lastCheck=now.toISOString();
    if(!selected.length && !initial) {
      props.setProperty('RADAR_STATE',JSON.stringify(state));
      console.log('Sin oportunidades nuevas. No se envió correo. Avisos: '+report.warnings.join('; '));
      if(report.warnings.length) throw new Error('Revisión parcial sin correo: '+report.warnings.join('; '));
      return;
    }
    if(MailApp.getRemainingDailyQuota()<1) throw new Error('No hay cuota de correo disponible. Temas conservados sin marcar.');
    const subject='[Radar IA · Edición Aular] '+(initial?'Radar en Google y borradores · ':'Temas y borradores · ')+date;
    const html=renderInforme_(selected,report,date,initial);
    props.setProperty('RADAR_PENDING',JSON.stringify({subject:subject,started:now.toISOString(),keys:selected.map(x=>x.key)}));
    // Un único destinatario fijo. MailApp no necesita acceso de lectura al buzón.
    MailApp.sendEmail({to:RADAR.recipient,subject:subject,body:'Informe editorial de Edición Aular. Abre la versión HTML para revisar fuentes y borradores. No se publica contenido automáticamente.',htmlBody:html,name:'Radar editorial · Edición Aular'});
    // Mantener la propiedad por debajo del límite de 9 KB de Apps Script.
    state.sent=state.sent.concat(selected.map(x=>x.key)).slice(-200);
    state.lastEmail=now.toISOString();
    props.setProperty('RADAR_STATE',JSON.stringify(state));
    props.deleteProperty('RADAR_PENDING');
    console.log(JSON.stringify({enviado:true,destinatario:RADAR.recipient,asunto:subject,borradores:selected.length,avisos:report.warnings}));
  } finally {lock.releaseLock();}
}

function recopilarRadar_() {
  const sources=[],warnings=[],candidates=[];
  const definitions=RADAR.feeds.concat([{name:'Blog publicado',url:RADAR.blog,kind:'blog'}]);
  const responses=UrlFetchApp.fetchAll(definitions.map(feed=>({url:feed.url,muteHttpExceptions:true,followRedirects:true,headers:{'User-Agent':'EdicionAular-Radar/1.0'}})));
  let published=[];
  definitions.forEach((feed,index)=>{
    try {
      const response=responses[index];
      if(response.getResponseCode()!==200) throw new Error('HTTP '+response.getResponseCode());
      const items=leerRss_(response.getContentText());
      if(!items.length) throw new Error('RSS vacío o formato no reconocido');
      sources.push({name:feed.name,items:items.length});
      if(feed.kind==='blog'){published=items;return;}
      items.slice(0,70).forEach(item=>{
        const text=item.title;
        if(!esTemaPertinente_(text))return;
        const age=Date.now()-new Date(item.date).getTime();
        if(!Number.isFinite(age)||age< -86400000||age>14*86400000)return;
        const key=huella_(feed.url+'|'+(item.guid||item.link));
        candidates.push(Object.assign(item,{key:key,source:feed.name,kind:feed.kind,score:puntuarTema_(text)+(feed.kind==='trend'?3:0)}));
      });
    }catch(error){warnings.push(feed.name+': '+error.message);}
  });
  if(!published.length)throw new Error('No se pudo comprobar el blog publicado. Se detiene el envío para evitar temas duplicados.');
  if(!sources.some(s=>s.name!=='Blog publicado'))throw new Error('No se pudo leer ninguna fuente de novedades.');
  const unique=new Set();
  const filtered=candidates.sort((a,b)=>b.score-a.score||new Date(b.date)-new Date(a.date)).filter(item=>{
    const titleKey=item.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
    if(unique.has(titleKey)||published.some(post=>post.link===item.link||post.title.toLowerCase()===item.title.toLowerCase()))return false;
    unique.add(titleKey);return true;
  });
  return {sources:sources,warnings:warnings,candidates:filtered,published:published};
}
function leerRss_(xml) {
  const root=XmlService.parse(xml).getRootElement(),channel=root.getChild('channel');
  if(!channel)return [];
  return channel.getChildren('item').map(item=>({title:limpiar_(item.getChildText('title')||'',180),link:urlSegura_(item.getChildText('link')||''),guid:item.getChildText('guid')||'',date:item.getChildText('pubDate')||''})).filter(x=>x.title&&x.link);
}
function esTemaPertinente_(title) {
  // Alcance comercial acotado: evitar ruido de investigación, financiación y alianzas.
  if(/biolog|genom|brain|neuro|molecular|drug|teen|safety report|partnership|partner with|investment|funding|economy|foundation|summit|festival|acquisition|automation team|our team|refreshed.*brand|DGX|NVIDIA/i.test(title))return false;
  return /\b(claude|kimi|n8n|whatsapp|chatgpt|gemini|gpt[ -]?\d|ai agents?|ai workflow|ai design|inteligencia artificial|agentes de ia|automatizaci[oó]n)\b/i.test(title);
}
function puntuarTema_(title) {return (/\b(agent|workflow|automation|automatiz|whatsapp|design|diseño|business|small business|website|code|coding|voice)\w*/i.test(title)?5:1)+(/\b(launch|introduc|new|release|update|nuev|actualiz)\w*/i.test(title)?2:0);}
function perfilTema_(title) {
  if(/whatsapp|reception|recepci[oó]n|cl[ií]nic/i.test(title))return {name:'atención y seguimiento',question:'¿Qué parte de una consulta puede mejorar y cuándo debe intervenir una persona?',service:'/soluciones-ia/agentes-ia-whatsapp/',existing:'/blog/whatsapp-business-o-agente-ia-como-elegir/',example:'una consulta de horarios que termina en una solicitud de cita',checks:['información aprobada y responsable de su actualización','derivación a una persona cuando falte información','confirmación real en la agenda antes de anunciar una reserva']};
  if(/n8n|agent|workflow|automat/i.test(title))return {name:'automatización de procesos',question:'¿Este cambio ayuda a resolver un proceso concreto o basta un flujo con reglas?',service:'/soluciones-ia/automatizacion-procesos-ia/',existing:'/blog/n8n-agentes-ia-automatizacion-flujos/',example:'una solicitud que se registra y pasa a revisión antes de generar un aviso',checks:['permisos acotados para cada herramienta','comportamiento ante fallos o solicitudes repetidas','revisión de una persona antes de acciones importantes']};
  if(/design|diseño|website|image|video|brand/i.test(title))return {name:'diseño y contenido',question:'¿Cómo encaja esta novedad en una pieza de marca que deba publicarse?',service:'/diseno-web/',existing:'/blog/claude-design-que-cambio-diseno-marcas/',example:'un primer boceto de una página de servicio revisado contra el sistema visual de la marca',checks:['coherencia de tipografía, color y composición','lectura y navegación en móvil y con teclado','exactitud del contenido y derechos de los recursos']};
  return {name:'uso de IA en un proceso de negocio',question:'¿Qué tarea conviene probar y con qué criterio se aceptará el resultado?',service:'/soluciones-ia/',existing:'/blog/adopcion-ia-embudos-marketing/',example:'un borrador de respuesta preparado con información pública y revisado por el equipo',checks:['disponibilidad del producto y versión exacta','condiciones de acceso, límites y costes vigentes','fuentes, errores y revisión humana del resultado']};
}
function borradorTema_(item,profile) {
  const title=limpiar_(item.title,130);
  return '<h3>Borrador inicial · requiere completar y verificar</h3>'+
    '<p><strong>Título de trabajo:</strong> '+esc_(title)+': qué revisar antes de aplicarlo a tu negocio</p>'+
    '<p><strong>Entrada propuesta.</strong> Antes de incorporar una novedad a tu operación, define una tarea y el resultado que esperas comprobar. En '+esc_(profile.name)+', la pregunta útil es: '+esc_(profile.question)+'</p>'+
    '<h4>Qué se anunció y qué falta confirmar</h4><p>La fuente detectada presenta «'+esc_(title)+'». <strong>[COMPLETAR:</strong> explicar el cambio con palabras propias después de leer la fuente primaria; confirmar fecha, versión, disponibilidad y límites. No trasladar métricas del fabricante como resultados propios.<strong>]</strong></p>'+
    '<h4>Cómo llevarlo a una tarea concreta</h4><p>Un escenario ilustrativo para preparar la prueba es '+esc_(profile.example)+'. Describe la información de entrada, la acción esperada y quién revisa el resultado. Este ejemplo sirve para diseñar una prueba; no representa una implementación ni un resultado de un cliente.</p>'+
    '<p>Empieza con información pública o datos sintéticos identificados como tales. Registra lo que hace la herramienta y las correcciones necesarias antes de ampliar el alcance.</p>'+
    '<h4>Tres puntos para evaluar</h4><ul>'+profile.checks.map(x=>'<li>'+esc_(x)+'.</li>').join('')+'</ul>'+
    '<h4>Cuándo conviene avanzar</h4><p>La decisión depende de la tarea, las conexiones necesarias y el mantenimiento. Si el resultado no cumple el criterio acordado, revisa el alcance antes de sumar herramientas. <strong>[COMPLETAR: resultado de una prueba propia, si existe; en caso contrario, dejar el texto como guía de evaluación.]</strong></p>'+
    '<h4>Siguiente paso</h4><p>¿Quieres evaluar una necesidad de tu negocio? Prepara tu consulta con el <a href="https://edicionaular.com/contacto/#orientador-proyecto">orientador de proyectos de Edición Aular</a> y conversemos sobre un primer alcance.</p>'+
    '<p><strong>Antes de publicar:</strong> completar los campos pendientes, comprobar enlaces y afirmaciones, revisar solapamiento con el blog y añadir una imagen pertinente. No publicar este borrador sin revisión.</p>';
}
function renderInforme_(items,report,date,initial) {
  let html='<html lang="es"><body style="font:16px/1.65 Arial,sans-serif;max-width:760px;margin:24px auto;padding:16px;color:#222"><h1>Radar editorial de IA</h1><p>'+esc_(date)+' · Edición Aular</p>';
  if(initial)html+='<p><strong>Prueba inicial del radar en Google.</strong> Programado para lunes y jueves entre 09:00 y 10:00 de Colombia, sin depender de tu computador.</p>';
  html+='<p>Selección por reglas, sin modelo de IA ni API de pago. Los borradores son una base editorial con campos pendientes; no son artículos terminados ni se publican automáticamente. Una novedad oficial no demuestra por sí sola una tendencia de búsquedas.</p>';
  if(!items.length)html+='<p>No se encontraron temas nuevos y pertinentes en las fuentes consultadas. Este correo inicial comprueba el envío; las siguientes revisiones sin novedades no enviarán un correo rutinario.</p>';
  items.forEach((item,index)=>{
    const profile=perfilTema_(item.title),existing=report.published.find(post=>post.link===('https://edicionaular.com'+profile.existing));
    html+='<hr><h2>'+String(index+1)+'. '+esc_(item.title)+'</h2><p><strong>Señal:</strong> '+esc_(item.kind==='trend'?'Consulta presente en el RSS actual de Trends para Colombia; no es una comparación histórica.':'Publicación en una fuente oficial; interés de búsqueda todavía no comprobado.')+'</p>'+
      '<p><strong>Fuente:</strong> <a href="'+esc_(item.link)+'">'+esc_(item.source)+'</a> · fecha indicada: '+esc_(item.date)+'</p>'+
      '<p><strong>Decisión editorial sugerida:</strong> '+(existing?'revisar si conviene actualizar <a href="'+esc_(existing.link)+'">esta guía existente</a> antes de crear otra URL.':'revisar el <a href="https://edicionaular.com/blog/">blog publicado</a> antes de crear una URL nueva.')+'</p>'+
      '<p><strong>Destino comercial:</strong> <a href="https://edicionaular.com'+profile.service+'">'+esc_(profile.name)+'</a>.</p>'+borradorTema_(item,profile);
  });
  html+='<hr><p>Fuentes leídas: '+report.sources.map(x=>esc_(x.name)+' ('+x.items+')').join(' · ')+'.</p>';
  if(report.warnings.length)html+='<p><strong>Revisión parcial:</strong> '+report.warnings.map(esc_).join('; ')+'. No se sustituyeron los datos ausentes por estimaciones.</p>';
  return html+'<p>Google Trends RSS es una señal puntual, sin cobertura exhaustiva ni históricos de 30/90 días. Las funciones y cuotas de los servicios pueden cambiar.</p></body></html>';
}
function limpiar_(text,max) {return String(text).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim().slice(0,max);}
function urlSegura_(url) {return /^https?:\/\/[^\s<>"']+$/i.test(url)?url:'';}
function esc_(text) {return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function huella_(text) {return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,text).map(b=>('0'+((b+256)%256).toString(16)).slice(-2)).join('').slice(0,24);}
