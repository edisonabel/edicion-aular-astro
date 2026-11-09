import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
const code=readFileSync(new URL('../automations/google-apps-script/Code.gs',import.meta.url),'utf8');
function runtime({failSend=false,pending=false,initialKeys=[]}={}){
  const properties={RADAR_STATE:JSON.stringify({sent:initialKeys})};if(pending)properties.RADAR_PENDING='pending';
  const emails=[],triggers=[];
  const ctx=vm.createContext({console:{log(){}},Date,Set,JSON,Number,Object,String,Error,LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock(){}})},PropertiesService:{getScriptProperties:()=>({getProperty:k=>properties[k]||null,setProperty:(k,v)=>{properties[k]=v},deleteProperty:k=>{delete properties[k]}})},Utilities:{formatDate:()=> '2026-10-30'},MailApp:{getRemainingDailyQuota:()=>100,sendEmail:mail=>{if(failSend)throw new Error('uncertain');emails.push(mail)}},ScriptApp:{WeekDay:{MONDAY:'MO',THURSDAY:'TH'},getProjectTriggers:()=>[],newTrigger:name=>{const t={name,timeBased(){return this},everyWeeks(n){this.weeks=n;return this},onWeekDay(day){this.day=day;return this},atHour(hour){this.hour=hour;return this},inTimezone(zone){this.zone=zone;return this},create(){triggers.push(this)}};return t}}});
  vm.runInContext(code,ctx);
  vm.runInContext("recopilarRadar_=()=>({sources:[{name:'Fuente',items:1}],warnings:[],published:[],candidates:[{key:'abc',title:'New n8n agent workflow',link:'https://n8n.io/blog/example/',kind:'official',source:'n8n',date:'Fri, 30 Oct 2026 12:00:00 GMT'}]})",ctx);
  vm.runInContext("sincronizarEstudio_=()=>{}",ctx);
  return {ctx,properties,emails,triggers,run:(expression)=>vm.runInContext(expression,ctx)};
}
test('envía una vez al destinatario fijo, guarda estado después de éxito y descarta repetidos',()=>{
  const r=runtime();r.run('ejecutarRadar()');r.run('ejecutarRadar()');assert.equal(r.emails.length,1);assert.equal(r.emails[0].to,'edicionaular@gmail.com');assert.ok(r.emails[0].htmlBody.includes('requiere completar y verificar'));assert.deepEqual(JSON.parse(r.properties.RADAR_STATE).sent,['abc']);assert.equal(r.properties.RADAR_PENDING,undefined);
});
test('un envío fallido o incierto no marca temas como enviados ni reintenta automáticamente',()=>{
  const r=runtime({failSend:true});assert.throws(()=>r.run('ejecutarRadar()'),/uncertain/);assert.deepEqual(JSON.parse(r.properties.RADAR_STATE).sent,[]);assert.ok(r.properties.RADAR_PENDING);assert.throws(()=>r.run('ejecutarRadar()'),/pendiente/);
});
test('programa dos ejecuciones semanales con zona de Colombia y no envía al instalar',()=>{
  const r=runtime();r.run('instalarRadar()');assert.deepEqual(r.triggers.map(x=>[x.day,x.hour,x.zone,x.weeks]),[['MO',9,'America/Bogota',1],['TH',9,'America/Bogota',1]]);assert.equal(r.emails.length,0);
});
test('fuentes no pueden insertar HTML ejecutable y el estado compacto cabe en 9KB',()=>{
  const r=runtime();assert.equal(r.run("urlSegura_('javascript:alert(1)')"),'');assert.equal(r.run("esc_('<script>')"),'&lt;script&gt;');assert.ok(Buffer.byteLength(JSON.stringify({sent:Array(200).fill('a'.repeat(24)),lastCheck:new Date().toISOString(),lastEmail:new Date().toISOString()}))<9000);
});
test('el filtro comercial descarta investigación y alianzas, y conserva herramientas y flujos aplicables',()=>{
  const r=runtime();
  for(const title of ['Using thousands of AI agents to uncover new leads in biological data','OpenAI and ServiceNow expand partnership across enterprise workflows',"Why We're Moving n8n's Automation Team Beyond the Service Desk Model",'warriors - lakers'])assert.equal(r.run(`esTemaPertinente_(${JSON.stringify(title)})`),false,title);
  for(const title of ['Introducing n8n 3.0','AI Agent Memory: How LLM Agents Manage State in Production','Claude Design update','WhatsApp Business'])assert.equal(r.run(`esTemaPertinente_(${JSON.stringify(title)})`),true,title);
});

 test('descarta métricas comerciales de pilotos y casos empresariales como tendencias automáticas',()=>{const r=runtime();for(const title of ['Credit Saison achieves 954% ROI in a ChatGPT Enterprise pilot','DevRev delivers autonomous self-service with GPT-6.1 Sol'])assert.equal(r.run(`esTemaPertinente_(${JSON.stringify(title)})`),false);});
 test('si el estudio no confirma, no envía correo ni marca sugerencias como enviadas',()=>{const r=runtime();r.run("sincronizarEstudio_=()=>{throw new Error('No se confirmó el estudio')} ");assert.throws(()=>r.run('ejecutarRadar()'),/estudio/);assert.equal(r.emails.length,0);assert.deepEqual(JSON.parse(r.properties.RADAR_STATE).sent,[]);assert.equal(r.properties.RADAR_PENDING,undefined);});
// The real Apps Script sync function must sign precisely the bytes sent to Netlify.
import { createHmac } from 'node:crypto';
test('la conexión real de Apps Script firma el cuerpo exacto y exige confirmación del estudio',()=>{
  const source=code.slice(code.indexOf('function sincronizarEstudio_('),code.indexOf('function borradorTema_('));
  const r=runtime();let captured;
  r.ctx.Utilities.computeHmacSha256Signature=(message,key)=>Array.from(createHmac('sha256',key).update(message).digest());
  r.properties.EDITORIAL_RADAR_SECRET='test-only';
  r.ctx.UrlFetchApp={fetch:(url,options)=>{captured={url,options};return{getResponseCode:()=>200,getContentText:()=>'{"received":true}'};}};
  vm.runInContext(source,r.ctx);r.run("sincronizarEstudio_([{key:'source',title:'WhatsApp Business',link:'https://blog.google/example/',date:'2026-11-05',source:'Google',kind:'official'}],'2026-11-05')");
  assert.equal(captured.url,'https://edicionaular.com/api/editorial-radar');const options=captured.options;
  assert.equal(options.headers['X-Radar-Signature'],createHmac('sha256','test-only').update(options.headers['X-Radar-Time']+'.'+options.payload).digest('hex'));
  assert.equal(options.followRedirects,false);assert.equal(JSON.parse(options.payload).items.length,1);
  r.ctx.UrlFetchApp.fetch=()=>({getResponseCode:()=>503});assert.throws(()=>r.run("sincronizarEstudio_([],'2026-11-05')"),/503/);
});

test('transporta tildes, signos y emojis sin cambiar los bytes firmados',()=>{
  const r=runtime();let captured;const source=code.slice(code.indexOf('function enviarAlEstudio_('),code.indexOf('function borradorTema_('));
  r.properties.EDITORIAL_RADAR_SECRET='test-only';
  r.ctx.Utilities.computeHmacSha256Signature=(message,key)=>Array.from(createHmac('sha256',key).update(message).digest());
  r.ctx.UrlFetchApp={fetch:(url,options)=>{captured=options;return{getResponseCode:()=>200,getContentText:()=>'{"received":true}'};}};
  vm.runInContext(source,r.ctx);
  r.run("enviarAlEstudio_({title:'Atención: ¿qué automatizar? 🤖',summary:'Diseño y recepción en Medellín'})");
  assert.ok([...captured.payload].every(char=>char.charCodeAt(0)<128));
  assert.equal(JSON.parse(captured.payload).title,'Atención: ¿qué automatizar? 🤖');
  assert.equal(captured.contentType,'application/json; charset=utf-8');
  assert.equal(captured.headers['X-Radar-Signature'],createHmac('sha256','test-only').update(captured.headers['X-Radar-Time']+'.'+captured.payload).digest('hex'));
});
