import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root=new URL('../',import.meta.url);
const outfile=fileURLToPath(new URL('.netlify/editorial-handler.mjs',root));
await build({
  absWorkingDir:fileURLToPath(root),entryPoints:['src/server/editorial-handler.mjs'],outfile,
  bundle:true,platform:'node',format:'esm',target:'node22',
  external:['@netlify/identity','@netlify/blobs'],
  banner:{js:"import {createRequire as __createRequire} from 'node:module'; const require=__createRequire(import.meta.url);"},
});
// Exercise the exact bundle with Lambda's restrictive module flags before deployment.
const check=spawnSync(process.execPath,['--no-experimental-require-module','--no-experimental-detect-module','--input-type=module','-e',
  `const {default:handler}=await import(${JSON.stringify(new URL('.netlify/editorial-handler.mjs',root).href)}); const r=await handler(new Request('https://edicionaular.com/api/editorial'));if(r.status!==401)throw new Error('Expected anonymous access rejection');`
],{stdio:'inherit'});
if(check.status!==0)throw new Error('La función editorial no superó la comprobación de módulos de Lambda.');
console.log('Función editorial preparada y acceso anónimo rechazado.');
