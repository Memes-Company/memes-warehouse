import { resolve } from 'dns';

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
    await new Promise(async (resolve) => {
      for (const id of Object.keys(database.pullRequests)) {
        const pullRequest = database.pullRequests[id];
        console.log(`Working on PR: ${pullRequest.id}`);
        await new Promise(async (resolve) => {
          for (const block of this.blocks) {
            try {
              console.log(`Apply ${block.name}...`);
              database = await block.process(database, pullRequest);
              if (this.blocks.slice(-1)[0].name === block.name) {
                resolve();
              }
            } catch (error) {
              console.error(`Pipeline block '${block.name}' failed with exception:`);
              console.error(error);
              console.error('when processing pull-request:');
              console.error(JSON.stringify(pullRequest));
              process.exit(1);
            }
          }
        });
        if (Object.keys(database.pullRequests).slice(-1)[0] === id) {
          resolve();
        }
      }
    });

    new Promise(async (resolve) => {
      if (process.env.TRAVIS_BRANCH) {
        await gitCheckout(process.env.TRAVIS_BRANCH);
        await gitAdd('.');
        await gitCommit('[skip-ci] Overall commit');
        await new SaveDatabase(this.config).process(database);
        await new PushChanges(this.config).process(database);
        resolve();
      }
    }).then(() => {
      console.log('Done!');
    });
  }
}
