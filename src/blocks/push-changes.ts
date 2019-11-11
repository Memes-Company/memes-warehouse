import { PullRequest, PipelineConfig } from '../types';
import sgit from 'simple-git/promise';
export async function pushChanges(pullRequest: PullRequest, config: PipelineConfig) {
  if (process.env.TRAVIS_BRANCH) {
    const git = sgit();
    await git
      .addRemote('new-origin', `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`)
      .then(() => git.push('new-origin', process.env.TRAVIS_BRANCH))
      .then(() => git.removeRemote('new-origin'));
  }
  return pullRequest;
}
