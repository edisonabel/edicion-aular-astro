import handler from '../../src/server/radar-handler.mjs';
export default handler;
export const config={path:'/api/editorial-radar',rateLimit:{windowLimit:10,windowSize:60,aggregateBy:['ip','domain']}};
