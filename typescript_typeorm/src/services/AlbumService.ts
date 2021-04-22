import { getRepository, getConnection } from 'typeorm';
import { Album } from '../entity/Album';
import { CommonError } from '../middleware/errorHandler';
import * as AlbumModel from '../model/Album';

export const addAlbum = async (payload) => {
  const result = await AlbumModel.addAlbum(payload);
  return result;
};

export const getAlbum = async (payload) => {
  const result = await AlbumModel.getAlbumCount(payload);
  const { current , pageSize } = payload;
  const returnResult = {pagination: { current, pageSize, total: result.count}, result: result.data};
  return returnResult;
};

export const renameAlbum = async (payload) => {
  const result = await AlbumModel.renameAlbum(payload);
  return result;
};

export const deleteAlbum = async (payload) => {
  const result = await AlbumModel.deleteAlbum(payload);
  return result;
};
