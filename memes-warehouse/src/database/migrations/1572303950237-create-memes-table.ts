import {MigrationInterface, QueryRunner} from "typeorm";

export class createMemesTable1572303950237 implements MigrationInterface {
    name = 'createMemesTable1572303950237'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "memes" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar(128) NOT NULL, "description" text NOT NULL)`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "memes"`, undefined);
    }

}
