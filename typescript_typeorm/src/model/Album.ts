import { getConnection, getRepository, Like, getManager, SelectQueryBuilder } from 'typeorm';
import {Album} from '../entity/Album';
// import {Song} from '../entity/Song';
// import {Singer} from '../entity/Singer';

export const getAlbumCount = async (payload) => {
  const { current, pageSize, keyword } = payload;
  const skip = pageSize * (current - 1);
  const take = pageSize;
  const [data, count] = await getConnection()
  .createQueryBuilder(Album, 'album')
  .leftJoinAndSelect('album.songs', 'song')
  .leftJoinAndSelect('song.singers', 'singer')
  .where(`album.name ilike '%${keyword}%'`)
  .skip(skip)
  .take(take)
  .getManyAndCount();
  return {data, count};
};

export const renameAlbum = async (payload) => {
  const { id, name } = payload;
  const result = await getConnection()
  .createQueryBuilder()
  .update(Album)
  .set({ name })
  .where('id = :id', { id })
  .execute();
  return result;
};

export const deleteAlbum = async (payload) => {
  const { id } = payload;
  const result = await getConnection()
  .createQueryBuilder()
  .delete()
  .from(Album)
  .where('id = :id', { id })
  .execute();
  return result;
};

export const addAlbum = async (payload) => {
  const { name } = payload;
  const albumRepository = getRepository(Album);

  const result = await getConnection().transaction(async (transaction) => {
    const newAlbum: Album = albumRepository.create({ name });
    const insert: Album = await transaction.save(newAlbum);
    return insert;
  });

  return result;
};
