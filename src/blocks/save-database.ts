import { DataBase, LocaleAwarePullRequest, PipelineBlock, Locales } from '../types';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import rimraf from 'rimraf';

export class SaveDatabase extends PipelineBlock {
  public name: string = SaveDatabase.name;
  async process(database: DataBase, currentPullRequest: LocaleAwarePullRequest): Promise<DataBase> {
    const prsPath = path.join(this.config.dbpath, 'pull-requests');
    const dotjson = '.json';
    rimraf.sync(this.config.dbpath);
    fs.mkdirSync(prsPath, { recursive: true });

    for (const id of Object.keys(database.pullRequests)) {
      fs.writeFileSync(path.join(prsPath, `${id}.json`), JSON.stringify(database.pullRequests[id], null, 2));
    }
    Object.values(Locales).map((locale) => {
      const memesPath = path.join(this.config.dbpath, 'l10n', locale, 'memes');
      const tagsPath = path.join(this.config.dbpath, 'l10n', locale, 'tags');

      fs.mkdirSync(memesPath, { recursive: true });
      fs.mkdirSync(tagsPath, { recursive: true });

      Object.values(database.memes[locale]).forEach((meme) =>
        fs.writeFileSync(path.join(memesPath, `${meme.id}.json`), JSON.stringify(meme, null, 2)),
      );
      const tagsCache = {};
      Object.values(database.tags[locale]).forEach((tag) => {
        tagsCache[tag.id] = tag.title;
        fs.writeFileSync(path.join(tagsPath, `${tag.id}.json`), JSON.stringify(tag, null, 2));
      });
      const tagsCacheJson = JSON.stringify(tagsCache, null, 2);
      const tagsHash = crypto
        .createHash('sha1')
        .update(tagsCacheJson)
        .digest('hex');
      fs.writeFileSync(path.join(this.config.dbpath, 'tags.json'), tagsCacheJson);
      fs.writeFileSync(path.join(this.config.dbpath, 'tags.hash.txt'), tagsHash);
    });
    return Promise.resolve(database);
  }
}
