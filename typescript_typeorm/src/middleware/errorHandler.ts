import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserError) {
    res.status(401).json({
      message: err.message,
    });
  } else if (err instanceof CommonError) {
    logger.error(`COMMON - ${err.message}`);
    res.status(400).json(err.message);
  } else {
    res.status(500).json({message: 'SYSTEM_ERROR'});
  }
};

export default errorHandler;

export class UserError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export class CommonError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
