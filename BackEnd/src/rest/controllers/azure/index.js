const Router = require('koa-router');
const controller = require('./azureController');

const router = new Router();

router.get('/callback', controller.callback);

module.exports = router;
