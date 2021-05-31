const config = require('config');
const Cookies = require('cookies');
const { azureSignCookie } = require('../../../utils/commonFunction');

exports.callback = async (ctx) => {
  console.log('callback');
  try {
    const loginstr = await azureSignCookie(ctx.req.user);
    ctx.cookies.set('loginstr', loginstr,
      { httpOnly: false,
        maxAge:300000, // 5m
      });
    ctx.redirect(`${config.FRONTEND_DOMAIN}${config.FRONTEND_CALLBACK}`);
  } catch (error) {
    console.log(error);
    ctx.redirect(`${pconfig.FRONTEND_DOMAIN}/`);
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
