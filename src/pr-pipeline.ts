import { createTags } from './blocks/createTags';
import { PullRequest } from './types';
import { createMeme } from './blocks/createMeme';
import { addMemeToTags } from './blocks/addMemeToTags';
import sgit from 'simple-git/promise';
const fs = require('fs');

export async function run(jsonPath: string, config: { dbpath: string }): Promise<PullRequest> {
  const json = fs.readFileSync(jsonPath);
  const pullRequest: PullRequest = JSON.parse(json);

  const blocks = [createTags, createMeme, addMemeToTags];

  for (const block of blocks) {
    await block(pullRequest, config);
  }

  if (process.env.TRAVIS_BRANCH) {
    const git = sgit();
    fs.unlinkSync(jsonPath);
    await git
      .checkout(process.env.TRAVIS_BRANCH)
      .then(() => git.add('.'))
      .then(() => git.commit(`[skip-ci] Add ${pullRequest.meme.title['en']}`))
      .then(() =>
        git.addRemote('new-origin', `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`),
      )
      .then(() => git.push('new-origin', process.env.TRAVIS_BRANCH));
  }
  return pullRequest;
}
