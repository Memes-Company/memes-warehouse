import { PullRequest, PipelineConfig } from '../types';
const fs = require('fs');
import sgit from 'simple-git/promise';

export async function commitChanges(pullRequest: PullRequest, config: PipelineConfig) {
  // if (process.env.TRAVIS_BRANCH) {
  //   const git = sgit();
  //   fs.unlinkSync(config.pullrequestsDir);
  //   await git
  //     .checkout(process.env.TRAVIS_BRANCH)
  //     .then(() => git.add('.'))
  //     .then(() => git.commit(`[skip-ci] Add ${pullRequest.en.meme.title}`))
  //     .then(() =>
  //       git.addRemote('new-origin', `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`),
  //     )
  //     .then(() => git.push('new-origin', process.env.TRAVIS_BRANCH));
  // }
  return pullRequest;
}
