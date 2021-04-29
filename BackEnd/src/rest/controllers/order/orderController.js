const returnFormat = require('../../../utils/makeReturnFunctionResult');
const ResFormator = require('../../../utils/formator');

const orderList = [
  {
    orderID: '0001',
    orderName: 'Drink-Milk Shop',
    investor: 'Gina',
    description: '喝好喝滿',
    closeTime: '2021/04/30 12:00',
  },
  {
    orderID: '0002',
    orderName: 'Drink-KEBUKE',
    investor: 'Fangtzu',
    description: '喝好喝滿',
    closeTime: '2021/04/30 12:00',
  },
];

exports.getOrderList = async (ctx) => {
  try {
    ctx.body = new ResFormator(orderList).fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};