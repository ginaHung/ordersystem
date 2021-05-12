const config = require('config');
const passport = require('../../middlewares/passport');
const { signJWTtoken } = require('../../../utils/normalFun');

exports.callback = async (ctx) => {
  try {
    passport.authenticate('azure_ad_oauth2');
    console.log(ctx);

    const token = await signJWTtoken('req.user.mailNickname');
    ctx.cookies.set('login', token);
    ctx.redirect(`${config.frontend_domain}${config.frontend_path}`);
  } catch (error) {
    console.log(error);
    res.redirect(`${config.frontend_domain}/#/401`);
    return;
  }
};
