const config = require('config');
const returnFormat = require('../../../utils/makeReturnFunctionResult');
const postgres = require('../../models/postgres');
const ResFormator = require('../../../utils/formator');
const { object } = require('joi');

const orderList = [
  {
    id: '1',
    id_num: '20210425-1016',
    name: 'Drink1',
    user_id: '10910305',
    user: 'Gina', 
    description: '喝起來',
    endtime: '2021/04/30 12:00',
    invite_code: '123456',
    menu_id: '',
    class_1: '',
    class_2: '',
    class_3: '',
    class_4: '',
    class_5: '',
  },
  {
    id: '2',
    id_num: '20210426-1116',
    name: 'Drink2',
    user_id: '10910305',
    user: 'Gina', 
    description: '喝起來',
    endtime: '2021/04/30 12:00',
    invite_code: '123456',
    menu_id: '',
    class_1: '',
    class_2: '',
    class_3: '',
    class_4: '',
    class_5: '',
  },
];

const orderItemList = [
  {
    id: '1',
    orderID: '1',
    user_name: 'Gina',
    item_name: '珍奶',
    class_1: '微',
    class_2: '微',
    class_3: '',
    class_4: '',
    class_5: '',
    remark: 'HAHAHA',
    price: '50',
  },
  
];

const { schema } = config;

exports.getAllOrderList = async (ctx) => {
  try {
    const sqlCommand = `
    select id, id_num, name, user_id, user_name, describe, endtime, invite_code, menu_id,
      class_1, class_2, class_3, class_4, class_5
    from  ${schema}.orderheader
    `;
    console.log(sqlCommand);
    result = await postgres.query(sqlCommand);
    if (result.success === false) {
      ctx.body = new ResFormator(new Error(result.error)).fullResponse;
      // return false;
    }
    ctx.body = new ResFormator(result.data).fullResponse;
    // return true;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
    // return false;
  }
};

exports.getMyOrder = async (ctx) => {
  const { body } = ctx.request;
  try {
    const sqlCommand = `
    select id, id_num, name, user_id, user_name, describe, endtime, invite_code, menu_id,
      class_1, class_2, class_3, class_4, class_5
    from  ${schema}.orderheader
    where user_id = '${body.user_id}'
    `;
    console.log(sqlCommand);
    result = await postgres.query(sqlCommand);
    if (result.success === false) {
      ctx.body = new ResFormator(new Error(result.error)).fullResponse;
      // return false;
    }
    ctx.body = new ResFormator(result.data).fullResponse;
    // return true;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
    // return false;
  }
};



exports.addOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.id_num === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id_num is empty'}).fullResponse;
    } else if (body.name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'name is empty'}).fullResponse;
    } else if (body.user_id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user_id is empty'}).fullResponse;
    } else if (body.user === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user is empty'}).fullResponse;
    } else if (body.endtime === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'endtime is empty'}).fullResponse;
    } else if (body.invite_code === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'invite_code is empty'}).fullResponse;
    } else {
      tempBody = Object.assign(body);
      tempBody.id = (orderList.length + 1).toString();
      orderList.push(tempBody);
      ctx.body = new ResFormator(orderList).fullResponse;
    }
    
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.editOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id is empty'}).fullResponse;
    } else if (body.id_num === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id_num is empty'}).fullResponse;
    } else if (body.name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'name is empty'}).fullResponse;
    } else if (body.user_id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user_id is empty'}).fullResponse;
    } else if (body.user === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user is empty'}).fullResponse;
    } else if (body.endtime === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'endtime is empty'}).fullResponse;
    } else if (body.invite_code === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'invite_code is empty'}).fullResponse;
    } else {
      for (let i = 0; i < orderList.length; i += 1) {
        if (body.id === orderList[i].id) {
          orderList[i] = Object.assign(body);
          break;
        }
      }
      ctx.body = new ResFormator('success').fullResponse;
    } 
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.deleteOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.id === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'id is empty'}).fullResponse;
    } else {
      for (let i = 0; i < orderList.length; i += 1) {
        if (body.id === orderList[i].id) {
          orderList.splice(i, 1);
          break;
        }
      }
      ctx.body = new ResFormator('success').fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.addOrderItem = async (ctx) => {
  try {
    const { body } = ctx.request;
    if (body.orderID === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'orderID is empty'}).fullResponse;
    } else if (body.user_name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'user_name is empty'}).fullResponse;
    } else if (body.item_name === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'item_name is empty'}).fullResponse;
    } else if (body.price === undefined) {
      ctx.body = new ResFormator({name: 'Error', message: 'price is empty'}).fullResponse;
    } else {
      tempBody = Object.assign(body);
      tempBody.id = (orderItemList.length + 1).toString();
      orderItemList.push(tempBody);
      ctx.body = new ResFormator(orderItemList).fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};