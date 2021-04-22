import * as Faker from 'faker/locale/zh_TW';
import { define } from 'typeorm-seeding'
import { Song } from '../entity/Song'

define(Song, (faker: typeof Faker) => {
    const words = faker.lorem.words();
    const song = new Song();
        song.name = words;
      return song;
});