export enum Country {
  TAIWAN = 'Taiwan',
  CHINA = 'China',
  USA = 'USA',
  JAPAN = 'Japan',
  KOREA = 'Korea',
}

import * as Faker from 'faker/locale/zh_TW';
import { define } from 'typeorm-seeding'
import { AlbumCountry } from '../entity/AlbumCountry'

define(AlbumCountry, (faker: typeof Faker) => {
    const country = faker.random.objectElement<Country>(Country);
    const lang = new AlbumCountry();
        lang.name = country;
      return lang;
});