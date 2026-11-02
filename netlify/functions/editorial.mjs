// Generated server bundle is prepared before Astro and Netlify package the function.
// Keeping the sanitizer bundled avoids require(ESM), disabled by AWS Lambda.
import handler from '../../.netlify/editorial-handler.mjs';
export default handler;
export const config = { path:'/api/editorial', rateLimit:{windowLimit:30,windowSize:60,aggregateBy:['ip','domain']} };
