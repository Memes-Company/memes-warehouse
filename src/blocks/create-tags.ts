import uuid from 'uuid/v4';

import { DataBase, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class CreateTags extends PipelineBlock {
  public name: string = CreateTags.name;
  async process(database: DataBase, currentPR: LocaleAwarePullRequest): Promise<DataBase> {
    currentPR.locales.map((locale) => {
      if (currentPR[locale].tags) {
        currentPR[locale].tags.map((title) => {
          const tagId = uuid();
          database.tags[locale][tagId] = { id: tagId, memes: [], title: title };
          currentPR[locale].meme.tags.push(tagId);
        });
      }
    });
    return database;
  }
}
