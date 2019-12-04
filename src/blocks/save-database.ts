import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import request from 'request';
import rimraf from 'rimraf';
import sharp from 'sharp';

import { DataBase, Locales, PipelineBlock } from '../types';

export class SaveDatabase extends PipelineBlock {
  public name: string = SaveDatabase.name;
  async process(database: DataBase): Promise<DataBase> {
    const prsPath = path.join(this.config.dbpath, 'pull-requests');
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

      Object.values(database.memes[locale]).forEach(async (meme) => {
        if (meme.source.type === 'image') {
          fs.mkdirSync(path.join(this.config.dbpath, meme.id));
          await request.get({ url: meme.source.value, encoding: null }, (error, respose, body) => {
            //todo: get orig. size and then write previews untill we reach 32x32
            const sizes = [32, 64, 128, 256, 512, 1024];
            for (let size of sizes) {
              console.log(`Processing: ${size}...`);
              sharp(body)
                .resize(size, size, {
                  fit: 'contain',
                })
                //todo: not 'png' - peek format from metadata
                .toFile(path.join(this.config.dbpath, meme.id, `${size}.png`));
            }
          });
        }
        fs.writeFileSync(path.join(memesPath, `${meme.id}.json`), JSON.stringify(meme, null, 2));
      });
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
