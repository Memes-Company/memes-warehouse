import uuid from 'uuid/v4';
import { LocaleAwarePullRequest, PipelineConfig } from '../types/types';
const fs = require('fs');

import path from 'path';
export async function createTags(pullRequest: LocaleAwarePullRequest, config: PipelineConfig) {
  pullRequest.locales.map((locale) => {
    if (pullRequest[locale].tags) {
      const tagsdbPath = path.join(config.dbpath, 'tags.json');
      let tagsdb = JSON.parse(fs.readFileSync(tagsdbPath));
      pullRequest[locale].tags.map((tag) => {
        const tagId = uuid();
        pullRequest[locale].meme.tags.push(tagId);
        tagsdb[tagId] = tag;
      });
      fs.writeFileSync(tagsdbPath, JSON.stringify(tagsdb, null, 2));
    }
  });

  return pullRequest;
}
