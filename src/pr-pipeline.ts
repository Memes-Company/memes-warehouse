import {
  addMemeToTags,
  commitChanges,
  createMeme,
  createTags,
  getPullrequests,
  pushChanges,
  removePullrequests,
} from './blocks';
import { LocaleAwarePullRequest, PipelineConfig, DataSet, PipelineBlock } from './types';
import { LoadDataSet } from './blocks/load-dataset';

export class PullRequestsPipeline {
  private blocks: Array<PipelineBlock>;
  private config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
    // this.blocks = [createTags, createMeme, addMemeToTags, removePullrequests, commitChanges];
    this.blocks = [new LoadDataSet(this.config)];
  }

  async run(): Promise<void> {
    let dataset = null;
    for (const block of this.blocks) {
      try {
        console.log(`Apply ${block.name}...`);
        dataset = await block.process(dataset);
      } catch (error) {
        console.error(`Pipeline block '${block.name}' failed with exception:`);
        console.error(error);
        console.error('when processing pull-request:');
        console.error(JSON.stringify(dataset));
        process.exit(1);
      }
    }
    await pushChanges();
    console.log('Done!');
  }
}
