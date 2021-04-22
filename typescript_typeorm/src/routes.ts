import { RequestHandler } from 'express';
import validateMiddleware from './middleware/validate';
import * as check from './validate/check';
import { consolePath } from './middleware/test';

import * as AlbumController from './controller/AlbumController';

/**
 * 定義 RouteItem 的格式，你們很聰明應該看得懂吧！！ BY Hyman
 */
interface IRouteItem {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares: RequestHandler[];
}

/**
 * 所有 application 裡面的 routes 陣列，格式請參考 IRouteItem
 */
export const AppRoutes: IRouteItem[] = [
  {
    path: `/album`,
    method: 'delete',
    middlewares: [
      AlbumController.deleteAlbum,
    ],
  },
  {
    path: `/album`,
    method: 'put',
    middlewares: [
      AlbumController.renameAlbum,
    ],
  },
  {
    path: `/album`,
    method: 'get',
    middlewares: [
      validateMiddleware(check.getAlbum, { abortEarly: false }),
      AlbumController.getAlbum,
    ],
  },
  {
    path: `/album`,
    method: 'post',
    middlewares: [
      // isAuthorized,
      // validateMiddleware(validate.getProjectInfoById, { abortEarly: false }),
      AlbumController.addAlbum,
    ],
  },
];
