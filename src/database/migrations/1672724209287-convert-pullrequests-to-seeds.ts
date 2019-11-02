import { MigrationInterface, QueryRunner } from 'typeorm';
import path = require('path');
import { Meme } from '../entities/meme.entity';
import { getPullrequests } from '../utilities/get-pullrequests';

// tslint:disable-next-line: class-name
export class convertPullrequestsToSeeds1672720096399
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const pullrequestsDir = path.join(__dirname, '../../../db/pull-requests');
    getPullrequests(pullrequestsDir).map(pullrequest => {
      pullrequest.locales.map(locale => {
        const meme: Meme = { ...pullrequest[locale].meme, locale };
        const repository = queryRunner.connection.getRepository(Meme);
        repository.save(meme);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
