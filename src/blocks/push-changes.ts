import { PullRequest, PipelineConfig } from '../types';
import sgit from 'simple-git/promise';
export async function pushChanges(): Promise<void> {
  if (process.env.TRAVIS_BRANCH) {
    const git = sgit();
    console.log('Pushing changes to remote...');
    return git
      .addRemote('new-origin', `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`)
      .then(() => git.push('new-origin', process.env.TRAVIS_BRANCH))
      .then(() => git.removeRemote('new-origin'));
  }
}
