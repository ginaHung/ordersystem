const Router = require('koa-router');
const controller = require('./orderController');

const router = new Router();

/**
 * @api {POST} /api/order/getAllOrderList
 * @apiName getOrderList
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiSuccessExample {json} Request Example
 * {
 *   
 *  
 * }
 */
 router.post('/getAllOrderList', controller.getAllOrderList);

 /**
 * @api {POST} /api/order/getMyOrder
 * @apiName getOrderList
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} id, who want to login

 * @apiSuccessExample {json} Request Example
 * {
 *   user_id: '10905306'
 *  
 * }
 */
  router.post('/getMyOrder', controller.getMyOrder);

  /**
 * @api {POST} /api/order/saveOrder
 * @apiName addOrder
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   id: '1',
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
   router.post('/saveOrder', controller.saveOrder);

   /**
 * @api {POST} /api/order/getOrderData
 * @apiName getOrderList
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} id, who want to login

 * @apiSuccessExample {json} Request Example
 * {
 *   header_id: 1
 *  
 * }
 */
    router.post('/getOrderData', controller.getOrderData);

  
   /**
 * @api {POST} /api/order/getOrderItem
 * @apiName getOrderList
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} id, who want to login

 * @apiSuccessExample {json} Request Example
 * {
 *   header_id: 1
 *  
 * }
 */
    router.post('/getOrderItem', controller.getOrderItem);

 /**
 * @api {POST} /api/order/saveRow
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
  router.post('/saveRow', controller.saveRow);

  /**
 * @api {POST} /api/order/deleteOrder
 * @apiName addOrder
 * @apiGroup login
 * @apiVersion 1.0.0
 * @apiParam {string} user, who want to login
 * @apiParam {string} password, user's password
 * @apiSuccessExample {json} Request Example
 * {
 *   id: 1
 * }
 */
   router.post('/deleteOrder', controller.deleteOrder);

module.exports = router;
