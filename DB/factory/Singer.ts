export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
  }
import * as Faker from 'faker/locale/zh_TW';
import { define } from 'typeorm-seeding'
import { Singer } from '../entity/Singer'

define(Singer, (faker: typeof Faker) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${firstName} ${lastName}`
    const gender = faker.random.objectElement<Gender>(Gender);
    const singer = new Singer();
        singer.name = name;
        singer.gender = gender;
      return singer;
});