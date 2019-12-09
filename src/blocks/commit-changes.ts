import { gitAdd, gitCheckout, gitCommit } from '../functions';
import { DataBase, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class CommitChanges extends PipelineBlock {
  public name: string = CommitChanges.name;
  async process(database: DataBase, currentPR: LocaleAwarePullRequest): Promise<DataBase> {
    if (process.env.TRAVIS_BRANCH) {
      await gitCheckout(process.env.TRAVIS_BRANCH);
      await gitAdd('.');
      await gitCommit(`[skip-ci] Add new meme: ${currentPR[currentPR.locales[0]].meme.title}`);
    }
    return database;
  }
}
