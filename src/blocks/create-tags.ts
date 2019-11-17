import fs from 'fs';
import path from 'path';
import uuid from 'uuid/v4';

import { DataSet, LocaleAwarePullRequest, PipelineConfig, PipelineBlock } from '../types';

export class CreateTags extends PipelineBlock {
  public name: string = CreateTags.name;
  async process(dataset: DataSet, currentPR: LocaleAwarePullRequest): Promise<DataSet> {
    currentPR.locales.map((locale) => {
      if (currentPR[locale].tags) {
        currentPR[locale].tags.map((title) => {
          const tagId = uuid();
          dataset.tags[locale][tagId] = { id: tagId, memes: [], title: title };
          currentPR[locale].meme.tags.push(tagId);
        });
      }
    });
    return dataset;
  }
}
