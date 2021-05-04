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

 /**
 * @api {POST} /api/order/addOrder
 * @apiName addOrder
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   id_num: '20210425-1016', 
 *   name: 'Drink-Milk Shop',
 *   user_id: '10910305',
 *   user: 'Gina',
 *   description: '喝好喝滿',
 *   endtime: '2021/04/30 12:00',
 *   invite_code: '123456',
 *   menu_id: '',
 *   class_1: '',
 *   class_2: '',
 *   class_3: '',
 *   class_4: '',
 *   class_5: '',  
 * }
 */
  router.post('/addOrder', controller.addOrder);

/**
 * @api {POST} /api/order/editOrder
 * @apiName editOrder
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   id: '1'
 *   id_num: '20210425-1016', 
 *   name: 'Drink-Milk Shop',
 *   user_id: '10910305',
 *   user: 'Gina',
 *   description: '喝好喝滿',
 *   endtime: '2021/04/30 12:00',
 *   invite_code: '123456',
 *   menu_id: '',
 *   class_1: '',
 *   class_2: '',
 *   class_3: '',
 *   class_4: '',
 *   class_5: '',
 * }
 */
 router.post('/editOrder', controller.editOrder);

 /**
 * @api {POST} /api/order/deleteOrder
 * @apiName deleteOrder
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   id: '1'
 * }
 */
  router.post('/deleteOrder', controller.deleteOrder);
  
  /**
 * @api {POST} /api/order/addOrderItem
 * @apiName addOrderItem
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   orderID: '1', 
 *   user_name: 'Gina',
 *   item_name: '珍奶',
 *   remark: 'HAHAHA',
 *   class_1: '微',
 *   class_2: '微',
 *   class_3: '',
 *   class_4: '',
 *   class_5: '',
 *   price: '50',
 * }
 */
   router.post('/addOrderItem', controller.addOrderItem);

module.exports = router;
