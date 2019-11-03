import { MigrationInterface, QueryRunner } from 'typeorm';
import path = require('path');
import { Meme } from '../entities/meme.entity';
import { getPullrequests } from '../utilities/get-pullrequests';
import { Tag } from '../entities/tag.entity';
import uuid = require('uuid/v4');

// tslint:disable-next-line: class-name
export class loadPullrequestsToDb1572802906657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const pullrequestsDir = path.join(__dirname, '../../../db/pull-requests');
    const memesRepo = queryRunner.connection.getRepository(Meme);
    const tagsRepo = queryRunner.connection.getRepository(Tag);
    getPullrequests(pullrequestsDir).map(pullrequest => {
      pullrequest.locales.map(locale => {
        const meme: Meme = { ...pullrequest[locale].meme, locale, id: uuid() };
        memesRepo.save(meme);
        const tags: Tag[] = pullrequest[locale].tags.map(title => ({
          id: uuid(),
          title,
          locale,
          memes: [meme],
        }));
        tagsRepo.save(tags);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
