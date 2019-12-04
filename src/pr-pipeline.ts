import {
  PushChanges,
  LoadDataBase,
  CreateTags,
  CreateMeme,
  AddMemeToTags,
  RemovePullrequest,
  CommitChanges,
} from './blocks';
import { PipelineBlock, PipelineConfig } from './types';
import { SaveDatabase } from './blocks/save-database';

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
    for (const id of Object.keys(database.pullRequests)) {
      const pipeline = database.pullRequests[id];
      for (const block of this.blocks) {
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
    await new PushChanges(this.config).process(database);
    await new SaveDatabase(this.config).process(database);
    // await new CommitChanges(this.config).process(database);
    console.log('Done!');
  }
}
