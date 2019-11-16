import { addMemeToTags } from './blocks/addMemeToTags';
import { commitChanges } from './blocks/commitChanges';
import { createMeme } from './blocks/createMeme';
import { createTags } from './blocks/createTags';
import { getPullrequests } from './blocks/get-pullrequests';
import { removePullrequests } from './blocks/remove-pullrequests';
import { PipelineConfig, LocaleAwarePullRequest } from './types/types';
import { pushChanges } from './blocks/push-changes';

export class PullRequestsPipeline {
  private blocks: Array<Function>;
  private config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
    this.blocks = [createTags, createMeme, addMemeToTags, removePullrequests, commitChanges];
  }

  async run(): Promise<void> {
    for (const pullRequest of getPullrequests(this.config.pullrequestsDir)) {
      await this.processPullRequest(pullRequest);
    }
    await pushChanges();
  }
  async processPullRequest(pullRequest: LocaleAwarePullRequest) {
    for (const block of this.blocks) {
      try {
        console.log(`Apply ${block.name} at ${pullRequest[pullRequest.locales[0]].meme.title}`);
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
