import { PullRequest } from '../types.js';
const fs = require('fs');
import path from 'path';
export function addMemeToTags(pullRequest: PullRequest, config: { dbpath: string }) {
  pullRequest.meme.tags.forEach((tagId) => {
    const jsonPath = path.join(config.dbpath, 'tags', `${tagId}.json`);
    let json;
    if (fs.existsSync(jsonPath)) {
      json = JSON.parse(fs.readFileSync(jsonPath));
    } else {
      json = {
        memes: [],
      };
    }
    json.memes.push(pullRequest.meme.id);
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
  });
  return pullRequest;
}
