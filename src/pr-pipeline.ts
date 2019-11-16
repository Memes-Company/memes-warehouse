import {
  addMemeToTags,
  commitChanges,
  createMeme,
  createTags,
  getPullrequests,
  pushChanges,
  removePullrequests,
} from './blocks';
import { LocaleAwarePullRequest, PipelineConfig } from './types';

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
