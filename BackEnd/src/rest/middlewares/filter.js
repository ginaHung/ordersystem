// 進來會做的事情, 在這處理token, 每個進來都需要處理, 針對auth去產生token就好, 其他都是驗證
const config = require('config');
const ResFormator = require('../../utils/formator');

module.exports = async (ctx, next) => {
  console.log('filter');
  try {
    let doFilter = true;
    if (ctx.url.indexOf('/azure/callback') >= 0) {
      doFilter = false;
    }

    if (doFilter) {
      console.log(ctx.url);
      ctx.req.setTimeout(0);
    }

    await next();
  } catch (error) {
    ctx.body = new ResFormator(new Error(error.message)).fullResponse;
  }
}