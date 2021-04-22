const ResFormator = require('../../../utils/formator');


exports.returnString = async (ctx) => {
  console.log('returnString');
  try {
    const { body } = ctx.request;
    if(body.returnString) {
      ctx.body = new ResFormator(body.returnString).fullResponse;
    } else {
      ctx.body = new ResFormator(new Error('returnString is undefined')).fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};
