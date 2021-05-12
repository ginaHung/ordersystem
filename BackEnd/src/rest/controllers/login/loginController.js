const crypto = require('crypto');
const config = require('config');
const ResFormator = require('../../../utils/formator');
const validate = require("./validate");


const { schema } = config;

exports.verify = async (ctx) => {
  try {
    const { body } = ctx.request;
    const loginlist = ['10905306', '10910305'];
    // validate login
    await validate.login(ctx.request.body);
    if (loginlist.indexOf(body.user) >= 0) {
      ctx.body = new ResFormator('success').fullResponse;
    } else {
      ctx.body = new ResFormator({ name: 'Error', message: 'user is uncorrect' }).fullResponse;
    }
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};
