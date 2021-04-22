import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as constants from 'constants';
// import * as https from 'https;
import * as dotenv from 'dotenv';
// 這要放在最前面，其他的 module 才吃得到 env
dotenv.config();
import * as http from 'http';
import * as session from 'express-session';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { AppRoutes } from './routes';
import logger from './utils/logger/logger';
import dbconfig from './config/database';
// import passportAzure from './middleware/passport';
import errorHandler from './middleware/errorHandler';
import { connectLogger } from 'log4js';
import swaggerUi = require('swagger-ui-express');
import * as swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.APP_PORT;

createConnection(dbconfig).then(async (connection) => {
  const app = express();
  // Add secure http headers
  app.use(helmet({
    frameguard: {
      action: 'deny',
    },
    noCache: true,
    xssFilter: {
      setOnOldIE: true,
    },
  }));

  // Logger module for http request/response
  app.use(connectLogger(logger, {
    level: 'auto',
    format: (req, res, format) => format(`:remote-addr :method[:status][:response-timems] :url ${JSON.stringify(req.body)}`),
    nolog: '/\.(gif|jpe?g|png)$/',
  }));
  // http request body parser
  app.use(bodyParser.json());

  // mount static files
  app.use(express.static('public'));

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'session_secret##',
  }));
  // app.use(passportAzure.initialize());
  // app.use(passportAzure.session());

  // register all application routes
  AppRoutes.forEach((route) => {
    app[route.method](
      route.path,
      ...route.middlewares,
    );
  });

  app.use(errorHandler);

  if (process.env.NODE_ENV !== 'production') {
    // Swagger definition
    const swaggerDefinition = {
      info: {
        title: 'REST API for my App', // Title of the documentation
        version: '1.0.0', // Version of the app
        description: 'This is the REST API for my product', // short description of the app
      },
      host: 'localhost:' + PORT, // the host or url of the app
      basePath: '/', // the basepath of your endpoint
      securityDefinitions: {
        APIKeyHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'authorization',
        },
      },
      security: {
        APIKeyHeader: [],
      },
    };

    // options for the swagger docs
    const options = {
      // import swaggerDefinitions
      swaggerDefinition,
      // path to the API docs
      apis: ['./docs/**/*.yaml'],
    };

    // initialize swagger-jsdoc
    const swaggerSpec = swaggerJSDoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  // mount SSL certificate
  // const keyData = fs.readFileSync(path.resolve(__dirname, '../ssl/key.pem'), 'utf8');
  // const certData = fs.readFileSync(path.resolve(__dirname, '../ssl/cert.pem'), 'utf8');
  // const caData = fs.readFileSync(path.resolve(__dirname, '../ssl/client.csr'), 'utf8');

  http.createServer(app).listen(PORT, (error: Error) => {
    if (error) {
      logger.error(error);
      return process.exit(1);
    } else {
      logger.info('Listening on port: ' + PORT + '.');
    }
  });
}).catch((error) => { logger.error(error); });

// 如果你要用 https
// https.createServer({
//   key: keyData,
//   cert: certData,
//   ca: caData,
//   honorCipherOrder: true,
//   secureOptions: constants.SSL_OP_NO_SSLv3 || constants.SSL_OP_NO_TLSv1,
// }, app).listen(PORT, (error: Error) => {
//   if (error) {
//     logger.error(error);
//     return process.exit(1);
//   } else {
//     logger.info('Listening on port: ' + PORT + '.');
//   }
// });
// }).catch((error) => { logger.error(error); });
