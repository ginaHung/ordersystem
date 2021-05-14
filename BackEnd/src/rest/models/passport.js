// const passport = require('passport');
const passport = require('koa-passport')
const { Strategy } = require('passport-azure-ad-oauth2');
const axios = require('axios');
const config = require('config');
const jwt = require('jsonwebtoken');
const ResFormator = require('../../utils/formator');

passport.use(new Strategy({
  clientID: config.AAD_CLIENT_ID,
  clientSecret: config.AAD_CLIENT_SECRET,
  callbackURL: config.AAD_CALLBACK_URL,
  resource: config.AAD_RESOURCE_ID,
  tenant: config.AAD_TENANT_ID,
},
  async (accessToken, refreshToken, params, profile, done) => {
    // console.log('========accessToken==========', accessToken);
    const aadUserData = await axios
      .get('https://graph.windows.net/wistron.com/me?api-version=1.6', { headers: { Authorization: accessToken } })
      .then((info) => info.data);
    const { mailNickname, displayName, mail, physicalDeliveryOfficeName, surname, telephoneNumber } = aadUserData;
    const userData = {
      mailNickname, displayName, mail, physicalDeliveryOfficeName, surname, telephoneNumber,
    };
    console.log('========user login==========');
    done(null, userData);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports.isAuthorized = (ctx, next) => {
  // if (req.user) {
  //   // 如果走 session 方式過來可以直接看 req.user
  //   // 在這邊可以順便判斷使用者是否有權限進入該頁面
  //   next();
  // } else
  console.log('passport');
  console.log(ctx);
  console.log(passport);

  if (ctx.req.headers.authorization) {
    // 假設用 authorization token 這邊可以處理看要不要放行
    try {
      const bearerToken = req.headers.authorization.split(' ')[0]; // 字串切割
      const jwtPayload = jwt.verify(bearerToken, process.env.JWT_SECRET);
      console.log(jwtPayload);
      if (!jwtPayload) {
        res.status(401).send('JWT error');
        return;
      }
      // res.locals.jwtPayload = jwtPayload;
      req.user = jwtPayload;
    } catch (error) {
      console.error(error);
      res.status(401).send('others error');
      return;
    }
    next();
  } else {
    throw new UserError('INVALID USER');
  }
};

module.exports = passport;
