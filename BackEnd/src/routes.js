const Router = require('koa-router');
const config = require('config');
const passportAzure = require('./rest/middlewares/passport');
const queryRouter = require('./rest/controllers/query/index');
const loginRouter = require('./rest/controllers/login/index');
const orderRouter = require('./rest/controllers/order/index');
const azureRouter = require('./rest/controllers/azure/index');
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
  rootRouter.use('/azure',azureRouter.routes());

  // http://{domainName}/{port}/api/...
  app.use(rootRouter.routes(), rootRouter.allowedMethods());
};
