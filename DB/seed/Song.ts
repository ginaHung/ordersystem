import { Factory, Seeder } from 'typeorm-seeding';
import { Song } from '../entity/Song';

export default class CreateSong implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Song)().createMany(10);
  }
}