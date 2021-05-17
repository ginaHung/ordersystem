const Koa = require('koa');
const convert = require('koa-convert');
const koaBody = require('koa-body');
const session = require('koa-session');
const serve = require('koa-static');
const helmet = require('koa-helmet');
const cors = require('koa2-cors');
const path = require('path');
const logger = require('koa-logger');
const passport = require('./src/rest/models/passport');

const app = new Koa();
app.use(logger());

app.use(convert(koaBody({
  multipart: true,
  jsonLimit: '100mb',
  // 設置上傳文件大小最大限制，默認2M
  formidable: {
    maxFileSize: 200 * 1024 * 1024,
  },
})));


app.use(serve(path.join(__dirname, '/public'), {
  setHeaders(res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
  },
}));


const whitelist = [
  'http://localhost',
  `http://localhost:8888`,
  // `http://127.0.0.1:8888`,
  `http://10.31.50.66`,
];

// X-Frame-Options Header
app.use(helmet.frameguard({ action: 'sameorigin' }));

// X-Content-Type-Options
app.use(helmet.noSniff());

// Sets "X-XSS-Protection: 1; mode=block".
app.use(helmet.xssFilter());

function checkOriginAgainstWhitelist(ctx) {
  const requestOrigin = ctx.accept.headers.origin;
  if (!requestOrigin) return `http://localhost`;
  if (!whitelist.includes(requestOrigin)) return ctx.throw(`${requestOrigin} is not a valid origin`);
  return requestOrigin;
}

const corsOptions = {
  origin: checkOriginAgainstWhitelist, // Access-Control-Allow-Origin
  allowMethods: ['GET', 'POST', 'DELETE'], // Access-Control-Allow-Methods
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token_code', 'user'], // Access-Control-Allow-Headers
  credentials: true, // Access-Control-Allow-Credentials
};
app.use(cors(corsOptions));


app.keys = ['session_secret##'];
app.use(session(app));
app.use(passport.initialize());
app.use(passport.session());

// router
// app.use(require('./src/rest/middlewares/response'));
app.use(require('./src/rest/middlewares/filter'));
require('./src/routes')(app);


process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});

const server = require('http').Server(app.callback());// implement koa app to http server

// start

server.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    return console.log(`http server init error: ${err.message}`);
  }
  console.log('http server listening at port: 8080');
  return true;
});

module.exports = server;

