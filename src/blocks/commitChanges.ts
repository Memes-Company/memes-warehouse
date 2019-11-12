import { LocaleAwarePullRequest, PipelineConfig } from '../types';
import sgit from 'simple-git/promise';
export async function commitChanges(pullRequest: LocaleAwarePullRequest, config: PipelineConfig) {
  if (process.env.TRAVIS_BRANCH) {
    const git = sgit();
    await git
      .checkout(process.env.TRAVIS_BRANCH)
      .then(() => git.add('.'))
      .then(() => git.commit(`[skip-ci] Add ${pullRequest[pullRequest.locales[0]].meme.title}`));
  }
  return pullRequest;
}
