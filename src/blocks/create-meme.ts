import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';

import { DataBase, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class CreateMeme extends PipelineBlock {
  public name: string = CreateMeme.name;
  process(database: DataBase, currentPR: LocaleAwarePullRequest): Promise<DataBase> {
    currentPR.locales.map((locale) => {
      currentPR[locale].meme.id = uuid();
      fs.writeFileSync(
        path.join(this.config.dbpath, 'l10n', locale, 'memes', `${currentPR[locale].meme.id}.json`),
        JSON.stringify(currentPR[locale].meme, null, 2),
      );
    });
    return Promise.resolve(database);
  }
}
