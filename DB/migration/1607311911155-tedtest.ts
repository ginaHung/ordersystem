import {MigrationInterface, QueryRunner} from "typeorm";

export class tedtest1607311911155 implements MigrationInterface {
    name = 'tedtest1607311911155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "singer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "gender" character varying NOT NULL, "songId" uuid, CONSTRAINT "PK_e4c3b81fd51f0f6ae40d9936175" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "albumId" uuid, CONSTRAINT "PK_baaa977f861cce6ff954ccee285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_a6d6455d1900d3fe2f3daf37ba1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "countryId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "singer" ADD CONSTRAINT "FK_54e258aff5055437f29928cf5e8" FOREIGN KEY ("songId") REFERENCES "song"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song" ADD CONSTRAINT "FK_c529927ae410af49faaf2e239a5" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_83fa617245e143e660243908f75" FOREIGN KEY ("countryId") REFERENCES "album_country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_83fa617245e143e660243908f75"`);
        await queryRunner.query(`ALTER TABLE "song" DROP CONSTRAINT "FK_c529927ae410af49faaf2e239a5"`);
        await queryRunner.query(`ALTER TABLE "singer" DROP CONSTRAINT "FK_54e258aff5055437f29928cf5e8"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "album_country"`);
        await queryRunner.query(`DROP TABLE "song"`);
        await queryRunner.query(`DROP TABLE "singer"`);
    }

}
