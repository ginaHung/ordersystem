import { Factory, Seeder } from 'typeorm-seeding';
import { Album } from '../entity/Album';
import { AlbumCountry } from '../entity/AlbumCountry';

export default class CreateAlbum implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Album)().createMany(10);
  }
}