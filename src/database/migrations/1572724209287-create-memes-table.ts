import {MigrationInterface, QueryRunner} from "typeorm";

export class createMemesTable1572724209287 implements MigrationInterface {
    name = 'createMemesTable1572724209287'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "memes" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "title" varchar(128) NOT NULL, "description" text NOT NULL, "source" text NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "memes"`, undefined);
    }

}
