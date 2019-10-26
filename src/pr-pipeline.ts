import { createTags } from './blocks/createTags';
import { PullRequest, PipelineConfig } from './types';
import { createMeme } from './blocks/createMeme';
import { addMemeToTags } from './blocks/addMemeToTags';
import { commitChanges } from './blocks/commitChanges';
import { parsePullRequest } from './blocks/parse-pull-request';

export async function run(config: PipelineConfig): Promise<PullRequest> {
  const blocks = [parsePullRequest, createTags, createMeme, addMemeToTags, commitChanges];
  let pullRequest = null;
  for (const block of blocks) {
    try {
      pullRequest = await block(pullRequest, config);
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
