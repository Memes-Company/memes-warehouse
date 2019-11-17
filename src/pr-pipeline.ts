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

export class PullRequestsPipeline {
  private blocks: Array<PipelineBlock>;
  private config: PipelineConfig;
  constructor(config: PipelineConfig) {
    this.config = config;
    this.blocks = [CreateTags, CreateMeme, AddMemeToTags, RemovePullrequest, CommitChanges].map(
      (e) => new e(this.config),
    );
  }

  async run(): Promise<void> {
    let database = await new LoadDataBase(this.config).process(null, null); // not so beauty as I expected 🤔
    for (const id of Object.keys(database.pullRequests)) {
      for (const block of this.blocks) {
        try {
          console.log(`Apply ${block.name}...`);
          database = await block.process(database, database.pullRequests[id]);
        } catch (error) {
          console.error(`Pipeline block '${block.name}' failed with exception:`);
          console.error(error);
          console.error('when processing pull-request:');
          console.error(JSON.stringify(database.pullRequests[id]));
          process.exit(1);
        }
      }
    }
    await new PushChanges(this.config).process(database, null);
    console.log('Done!');
  }
}
