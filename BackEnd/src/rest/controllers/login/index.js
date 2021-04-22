const Router = require('koa-router');
const controller = require('./loginController');

const router = new Router();

/**
 * @api {POST} /api/login/verify
 * @apiName verify
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   "user":"whq\\10406311",
 *   "pwd":"caonruoiea oirw",
 * }
 */
router.post('/verify', controller.verify);

module.exports = router;
