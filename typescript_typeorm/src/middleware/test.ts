import { Request, Response } from 'express';
import logger from '../utils/logger/logger';

export function consolePath(request: Request, response: Response, next: () => void) {
  logger.info(request.url);
  next();
}
