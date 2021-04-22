import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Schema, ValidationOptions, ValidationResult, ValidationErrorItem } from '@hapi/joi';
import { type } from 'os';

// 支援的express request 參數列表
const validateParams = [
  'headers',
  'params',
  'query',
  'body',
];

type Parameter = 'headers' | 'params' | 'query' | 'body';
/**
 * 可以支援多種參數同時驗證，但是你們要命名為這種方式
 * {
 *   body: Joi.object({}),
 *   query: Joi.object({}),
 * }
 */
export interface ICustomSchema {
  headers?: Schema;
  params?: Schema;
  query?: Schema;
  body?: Schema;
}

const validateMiddleware = (customSchema: ICustomSchema, validationOptions: ValidationOptions): RequestHandler => {
  const requestHandler: RequestHandler = (request: Request, response: Response, next: NextFunction) => {

    const validateSingleParameter = (parameter: Parameter): ValidationResult =>
      (customSchema[parameter].validate(request[parameter], validationOptions));

    const results: ValidationErrorItem[] = validateParams
      .filter((parameter: Parameter) => (request[parameter] && customSchema[parameter]))
      .map((parameter: Parameter) => validateSingleParameter(parameter))
      .filter((validationResult: ValidationResult) => (validationResult.errors || validationResult.error))
      .reduce((errorArray, validationResult: ValidationResult) => {
        if (validationResult.error && validationResult.error.details) {
          return errorArray.concat(validationResult.error.details);
        }
        return errorArray;
      }, []);
    if (!results.length) {
      next();
    } else {
      // 如果有錯誤你們可以定義要怎麼樣處理
      // 範例是回傳 400
      response.status(400).send(results);
    }
  };
  return requestHandler;
};

export default validateMiddleware;

/* results example
  [{
    "message": "\"title\" length must be less than or equal to 10 characters long",
    "path": [
        "title"
    ],
    "type": "string.max",
    "context": {
        "limit": 10,
        "value": "ajsoidefwefwijedfsijfgosijrdfoijeoifjfjwef",
        "label": "title",
        "key": "title"
    }
  }]
*/
