import {
  AddMemeToTags,
  CommitChanges,
  CreateMeme,
  CreateTags,
  LoadDataBase,
  PushChanges,
  RemovePullrequest,
} from './blocks';
import { SaveDatabase } from './blocks/save-database';
import { gitAdd, gitCheckout, gitCommit } from './functions';
import { PipelineBlock, PipelineConfig } from './types';

export class PullRequestsPipeline {
  private blocks: Array<PipelineBlock>;
  private config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
    this.blocks = [CreateTags, CreateMeme, AddMemeToTags, RemovePullrequest, SaveDatabase, CommitChanges].map(
      (e) => new e(this.config),
    );
  }

  async run(): Promise<void> {
    let database = await new LoadDataBase(this.config).process(null); // not so beauty as I expected 🤔
    for await (const id of Object.keys(database.pullRequests)) {
      const pipeline = database.pullRequests[id];
      for await (const block of this.blocks) {
        try {
          console.log(`Apply ${block.name}...`);
          database = await block.process(database, pipeline);
        } catch (error) {
          console.error(`Pipeline block '${block.name}' failed with exception:`);
          console.error(error);
          console.error('when processing pull-request:');
          console.error(JSON.stringify(pipeline));
          process.exit(1);
        }
      }
    }

    if (process.env.TRAVIS_BRANCH) {
      await gitCheckout(process.env.TRAVIS_BRANCH);
      await gitAdd('.');
      await gitCommit('Overall commit');
      await new SaveDatabase(this.config).process(database);
      await new PushChanges(this.config).process(database);
    }
    console.log('Done!');
  }
}
