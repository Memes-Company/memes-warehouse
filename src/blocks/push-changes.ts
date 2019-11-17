import sgit from 'simple-git/promise';
import { PipelineBlock, DataSet, LocaleAwarePullRequest } from '../types';

export class PushChanges extends PipelineBlock {
  public name: string;
  async process(dataset: DataSet, currentPR: LocaleAwarePullRequest): Promise<DataSet> {
    if (process.env.TRAVIS_BRANCH) {
      const git = sgit();
      console.log('Pushing changes to remote...');
      await git
        .addRemote('new-origin', `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`)
        .then(() => git.push('new-origin', process.env.TRAVIS_BRANCH))
        .then(() => git.removeRemote('new-origin'));
    }
    return dataset;
  }
}
