import { PullRequest, PipelineConfig } from '../types';
const fs = require('fs');
import path from 'path';
export async function addMemeToTags(pullRequest: PullRequest, config: PipelineConfig) {
  pullRequest.locales.map((locale) => {
    pullRequest[locale].meme.tags.forEach((tagId) => {
      const jsonPath = path.join(config.dbpath, 'l10n', locale, 'tags', `${tagId}.json`);
      let json;
      if (fs.existsSync(jsonPath)) {
        json = JSON.parse(fs.readFileSync(jsonPath));
      } else {
        json = {
          memes: [],
        };
      }
      json.memes.push(pullRequest[locale].meme.id);
      fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
    });
  });
  return pullRequest;
}
