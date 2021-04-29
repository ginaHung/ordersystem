const Router = require('koa-router');
const config = require('config');

const queryRouter = require('./rest/controllers/query/index');
const loginRouter = require('./rest/controllers/login/index');
const orderRouter = require('./rest/controllers/order/index');
const ResFormator = require('./utils/formator');

module.exports = (app) => {
  const rootRouter = new Router({
    prefix: config.prefix,
  });

  rootRouter.get('/', (ctx) => {
    ctx.body = new ResFormator('WiHRTalentDB').fullResponse;
  });

  // all router root
  rootRouter.use('/query', queryRouter.routes());
  rootRouter.use('/login', loginRouter.routes());
  rootRouter.use('/order', orderRouter.routes());

  // http://{domainName}/{port}/api/...
  app.use(rootRouter.routes(), rootRouter.allowedMethods());
};
