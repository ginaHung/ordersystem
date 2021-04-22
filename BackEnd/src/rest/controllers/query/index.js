const Router = require('koa-router');
const controller = require('./queryController');

const router = new Router();
/**
 * @api {POST} /returnstring return string
 * @apiName post to returnstring
 * @apiGroup query
 * @apiVersion 1.0.0
 * @apiParam {string} returnString 參數解說 returnString 希望回傳的字串
 *
 * @apiSuccessExample {json} Request Example
 * {
 *   "success":true,
 *   "data":returnstring,
 * }
 */

router.post('/returnstring', controller.returnString);

module.exports = router;
