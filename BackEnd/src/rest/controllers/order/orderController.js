const returnFormat = require('../../../utils/makeReturnFunctionResult');
const ResFormator = require('../../../utils/formator');
const { object } = require('joi');

const orderList = [
  {
    id: '1',
    id_num: '20210425-1016',
    name: 'Drink-Milk Shop',
    user_id: '10910305',
    user: 'Gina', 
    description: '喝好喝滿',
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
    name: 'Drink-KEBUKE',
    user_id: '10910305',
    user: 'Gina', 
    description: '喝好喝滿',
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

exports.getOrderList = async () => {
  try {
    ctx.body = new ResFormator(orderList).fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.addOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    tempBody = Object.assign(body);
    tempBody.id = (orderList.length + 1).toString();
    orderList.push(tempBody);
    ctx.body = new ResFormator(orderList).fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.editOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    for (let i = 0; i < orderList.length; i += 1) {
      if (body.id === orderList[i].id) {
        orderList[i] = Object.assign(body);
        break;
      }
    }
    ctx.body = new ResFormator('success').fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.deleteOrder = async (ctx) => {
  try {
    const { body } = ctx.request;
    for (let i = 0; i < orderList.length; i += 1) {
      if (body.id === orderList[i].id) {
        orderList.splice(i, 1);
        break;
      }
    }
    ctx.body = new ResFormator('success').fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};

exports.addOrderItem = async (ctx) => {
  try {
    const { body } = ctx.request;
    tempBody = Object.assign(body);
    tempBody.id = (orderItemList.length + 1).toString();
    orderItemList.push(tempBody);
    ctx.body = new ResFormator(orderItemList).fullResponse;
  }
};