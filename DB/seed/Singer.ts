import { Factory, Seeder } from 'typeorm-seeding';
import { Singer } from '../entity/Singer';

export default class CreateSinger implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Singer)().createMany(10);
  }
}