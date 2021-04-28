const Router = require('koa-router');
const controller = require('./orderController');

const router = new Router();

/**
 * @api {POST} /api/order/getOrderList
 * @apiName getOrderList
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   
 *   
 * }
 */
 router.post('/getOrderList', controller.getOrderList);

module.exports = router;
