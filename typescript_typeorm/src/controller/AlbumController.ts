import { Request, Response, NextFunction } from 'express';
import * as AlbumService from '../services/AlbumService';
import { CommonError } from '../middleware/errorHandler';

export const addAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await AlbumService.addAlbum(payload);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const getAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await AlbumService.getAlbum(payload);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const renameAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await AlbumService.renameAlbum(payload);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};

export const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await AlbumService.deleteAlbum(payload);
    res.json(result);
  } catch (err) {
    console.log(err.message);
    res.statusCode = 400;
    res.json(`Bad Request:${err.message}`);
  }
};
