import * as Joi from '@hapi/joi';
import { ICustomSchema } from '../middleware/validate';

export const addPostSchema: ICustomSchema = {
  body: Joi.object({
    title: Joi.string().max(10),
    text: Joi.string().max(10),
    categories: Joi.array().items(Joi.object({
      name: Joi.string().max(10),
    })),
  }),
};

export const getAlbum: ICustomSchema = {
  body: Joi.object({
    current: Joi.number().min(1).required,
    pageSize: Joi.number().min(1).required,
    keyword: Joi.string().required,
  }),
};
