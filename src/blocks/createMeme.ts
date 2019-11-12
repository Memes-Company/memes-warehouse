import uuid from 'uuid/v4';
import { LocaleAwarePullRequest, PipelineConfig } from '../types';
const fs = require('fs');

import path from 'path';
export async function createMeme(pullRequest: LocaleAwarePullRequest, config: PipelineConfig) {
  pullRequest.locales.map((locale) => {
    pullRequest[locale].meme.id = uuid();
    fs.writeFileSync(
      path.join(config.dbpath, 'l10n', locale, 'memes', `${pullRequest[locale].meme.id}.json`),
      JSON.stringify(pullRequest[locale].meme, null, 2),
    );
  });
  return pullRequest;
}
