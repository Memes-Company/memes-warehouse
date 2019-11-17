import sgit from 'simple-git/promise';

import { DataSet, PipelineBlock, LocaleAwarePullRequest, Locale } from '../types';

export class CommitChanges extends PipelineBlock {
  public name: string;
  async process(dataset: DataSet, currentPullRequest: LocaleAwarePullRequest): Promise<DataSet> {
    if (process.env.TRAVIS_BRANCH) {
      const git = sgit();
      await git
        .checkout(process.env.TRAVIS_BRANCH)
        .then(() => git.add('.'))
        .then(() =>
          git.commit(`[skip-ci] Add new meme: ${currentPullRequest[currentPullRequest.locales[0]].meme.title}`),
        );
    }
    return dataset;
  }
}
