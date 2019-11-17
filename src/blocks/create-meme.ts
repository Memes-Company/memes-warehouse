import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';

import { DataBase, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class CreateMeme extends PipelineBlock {
  public name: string = CreateMeme.name;
  process(database: DataBase, currentPR: LocaleAwarePullRequest): Promise<DataBase> {
    currentPR.locales.map((locale) => {
      const id = uuid();
      currentPR[locale].meme.id = id;
      database[locale].meme[id] = currentPR[locale].meme;
    });

    return Promise.resolve(database);
  }
}
