import { Factory, Seeder } from 'typeorm-seeding';
import { AlbumCountry } from '../entity/AlbumCountry';

export default class CreateAlbumCountry implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(AlbumCountry)().createMany(10);
  }
}