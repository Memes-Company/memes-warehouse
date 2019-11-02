import {MigrationInterface, QueryRunner} from "typeorm";

export class addTagsMemesTables1572731159701 implements MigrationInterface {
    name = 'addTagsMemesTables1572731159701'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "title" varchar(128) NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "memes" ("id" varchar PRIMARY KEY NOT NULL, "locale" varchar NOT NULL, "title" varchar(128) NOT NULL, "description" text NOT NULL, "source" text NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "tags_memes_memes" ("tagsId" varchar NOT NULL, "memesId" varchar NOT NULL, PRIMARY KEY ("tagsId", "memesId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a2bcc65cc4921b32a87510ca70" ON "tags_memes_memes" ("tagsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5d7d5ed2db86ea2822dbf8684c" ON "tags_memes_memes" ("memesId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a2bcc65cc4921b32a87510ca70"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5d7d5ed2db86ea2822dbf8684c"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_tags_memes_memes" ("tagsId" varchar NOT NULL, "memesId" varchar NOT NULL, CONSTRAINT "FK_a2bcc65cc4921b32a87510ca70b" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_5d7d5ed2db86ea2822dbf8684c6" FOREIGN KEY ("memesId") REFERENCES "memes" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("tagsId", "memesId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_tags_memes_memes"("tagsId", "memesId") SELECT "tagsId", "memesId" FROM "tags_memes_memes"`, undefined);
        await queryRunner.query(`DROP TABLE "tags_memes_memes"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_tags_memes_memes" RENAME TO "tags_memes_memes"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a2bcc65cc4921b32a87510ca70" ON "tags_memes_memes" ("tagsId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5d7d5ed2db86ea2822dbf8684c" ON "tags_memes_memes" ("memesId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_5d7d5ed2db86ea2822dbf8684c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a2bcc65cc4921b32a87510ca70"`, undefined);
        await queryRunner.query(`ALTER TABLE "tags_memes_memes" RENAME TO "temporary_tags_memes_memes"`, undefined);
        await queryRunner.query(`CREATE TABLE "tags_memes_memes" ("tagsId" varchar NOT NULL, "memesId" varchar NOT NULL, PRIMARY KEY ("tagsId", "memesId"))`, undefined);
        await queryRunner.query(`INSERT INTO "tags_memes_memes"("tagsId", "memesId") SELECT "tagsId", "memesId" FROM "temporary_tags_memes_memes"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_tags_memes_memes"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_5d7d5ed2db86ea2822dbf8684c" ON "tags_memes_memes" ("memesId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_a2bcc65cc4921b32a87510ca70" ON "tags_memes_memes" ("tagsId") `, undefined);
        await queryRunner.query(`DROP INDEX "IDX_5d7d5ed2db86ea2822dbf8684c"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_a2bcc65cc4921b32a87510ca70"`, undefined);
        await queryRunner.query(`DROP TABLE "tags_memes_memes"`, undefined);
        await queryRunner.query(`DROP TABLE "memes"`, undefined);
        await queryRunner.query(`DROP TABLE "tags"`, undefined);
    }

}
