import uuid from 'uuid/v4';
import { PullRequest, PipelineConfig } from '../types';
const fs = require('fs');

import path from 'path';
export async function createTags(pullRequest: PullRequest, config: PipelineConfig) {
  if (pullRequest.tags) {
    const tagsdbPath = path.join(config.dbpath, 'tags.json');
    let tagsdb = JSON.parse(fs.readFileSync(tagsdbPath));
    pullRequest.tags.map((tag) => {
      tag.id = uuid();
      pullRequest.meme.tags.push(tag.id);
      tagsdb[tag.id] = tag;
    });
    fs.writeFileSync(tagsdbPath, JSON.stringify(tagsdb, null, 2));
  }
  return pullRequest;
}
