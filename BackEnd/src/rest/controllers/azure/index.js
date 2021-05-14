const Router = require('koa-router');
const controller = require('./azureController');
const passport = require('../../models/passport');

const router = new Router();

router.get('/callback',
  passport.authenticate('azure_ad_oauth2'),
  controller.callback);

router.post('/logout', controller.logout);

module.exports = router;
