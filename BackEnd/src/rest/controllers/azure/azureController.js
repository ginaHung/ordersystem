const config = require('config');
const Cookies = require('cookies');
const { azureSignCookie } = require('../../../utils/commonFunction');

exports.callback = async (ctx) => {
  console.log('callback');
  try {
    const loginstr = await azureSignCookie(ctx.req.user);
    ctx.cookies.set('loginstr', loginstr, { httpOnly: false });
    console.log(`${config.frontend_domain}${config.frontend_path}`);
    ctx.redirect(`${config.frontend_domain}${config.frontend_path}`);
  } catch (error) {
    console.log(error);
    ctx.redirect(`${config.frontend_domain}/`);
    return;
  }
};

exports.logout = async (ctx) => {
  try {
    console.log('logout');
    ctx.logout();
    ctx.status = 200;
    return true;
  } catch (error) {
    console.log(error);
  }
};
