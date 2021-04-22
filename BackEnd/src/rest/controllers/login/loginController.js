const crypto = require('crypto');
const config = require('config');
const ResFormator = require('../../../utils/formator');
const validate = require("./validate");


const { schema } = config;

exports.verify = async (ctx) => {
  try {
    const { body } = ctx.request;

    // validate login
    await validate.login(ctx.request.body);

    ctx.body = new ResFormator('success').fullResponse;
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
};
