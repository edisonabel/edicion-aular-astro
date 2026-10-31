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
