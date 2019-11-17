import sgit from 'simple-git/promise';

import { DataSet, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class CommitChanges extends PipelineBlock {
  public name: string = CommitChanges.name;
  async process(dataset: DataSet, currentPR: LocaleAwarePullRequest): Promise<DataSet> {
    if (process.env.TRAVIS_BRANCH) {
      const git = sgit();
      await git
        .checkout(process.env.TRAVIS_BRANCH)
        .then(() => git.add('.'))
        .then(() => git.commit(`[skip-ci] Add new meme: ${currentPR[currentPR.locales[0]].meme.title}`));
    }
    return dataset;
  }
}
