import { createTags } from './blocks/createTags';
import { PullRequest, PipelineConfig } from './types';
import { createMeme } from './blocks/createMeme';
import { addMemeToTags } from './blocks/addMemeToTags';
import { commitChanges } from './blocks/commitChanges';
const fs = require('fs');

export async function run(config: PipelineConfig): Promise<PullRequest> {
  const json = fs.readFileSync(config.jsonPath);
  const pullRequest: PullRequest = JSON.parse(json);

  const blocks = [createTags, createMeme, addMemeToTags, commitChanges];

  for (const block of blocks) {
    try {
      await block(pullRequest, config);
    } catch (error) {
      console.error(`Pipeline block '${block.name}' failed with exception:`);
      console.error(error);
      console.error('when processing pull-request:');
      console.error(JSON.stringify(pullRequest));
      process.exit(1);
    }
  }

  return pullRequest;
}
