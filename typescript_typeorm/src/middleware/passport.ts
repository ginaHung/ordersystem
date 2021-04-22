// import * as passport from 'passport';
// import { Strategy } from 'passport-azure-ad-oauth2';
// import { decode } from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { UserError } from './errorHandler';

// passport.use(new Strategy({
//   clientID: process.env.AAD_CLIENT_ID,
//   clientSecret: process.env.AAD_CLIENT_SECRET,
//   callbackURL: process.env.AAD_CALLBACK_URL,
//   resource: process.env.AAD_RESOURCE_ID,
//   tenant: process.env.AAD_TENANT_ID,
// },
//   (accessToken, refreshToken, params, profile, done) => {
//     const waadProfile = decode(accessToken);
//     console.log('===========', waadProfile);
//     done(null, waadProfile);
//   }),
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// /**
//  * Authorization Required middleware.
//  */
// export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
//   if (req.user) {
//     // 如果走 session 方式過來可以直接看 req.user
//     // 在這邊可以順便判斷使用者是否有權限進入該頁面
//     console.log(req.path, req.user);
//     next();
//   } else if (req.headers.authorization) {
//     // 假設用 authorization token 這邊可以處理看要不要放行
//     next();
//   } else {
//     throw new UserError('INVALID USER');
//   }
// };

// export default passport;
