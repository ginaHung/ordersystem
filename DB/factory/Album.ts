import * as Faker from 'faker';
import { define } from 'typeorm-seeding'
import { Album } from '../entity/Album'
import { Country } from './AlbumCountry'

define(Album, (faker: typeof Faker) => {
    const product = faker.lorem.lines()
    // const country = faker.random.objectElement<Country>(Country);
    const album = new Album();
        album.name = product;
      return album;
});