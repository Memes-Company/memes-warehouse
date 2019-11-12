import { addMemeToTags } from './blocks/addMemeToTags';
import { commitChanges } from './blocks/commitChanges';
import { createMeme } from './blocks/createMeme';
import { createTags } from './blocks/createTags';
import { getPullrequests } from './blocks/get-pullrequests';
import { removePullrequests } from './blocks/remove-pullrequests';
import { PipelineConfig } from './types';

export class PullRequestsPipeline {
  private blocks: Array<Function>;
  private config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
    this.blocks = [createTags, createMeme, addMemeToTags, removePullrequests, commitChanges];
  }

  async run(): Promise<void> {
    getPullrequests(this.config.pullrequestsDir).map(async (pullRequest) => await this.processPullRequest(pullRequest));
  }
  async processPullRequest(pullRequest: any) {
    for (const block of this.blocks) {
      try {
        pullRequest = await block(pullRequest, this.config);
      } catch (error) {
        console.error(`Pipeline block '${block.name}' failed with exception:`);
        console.error(error);
        console.error('when processing pull-request:');
        console.error(JSON.stringify(pullRequest));
        process.exit(1);
      }
    }
  }
}
