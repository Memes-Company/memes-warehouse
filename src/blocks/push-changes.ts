import sgit from 'simple-git/promise';

import { DataBase, PipelineBlock } from '../types';

export class PushChanges extends PipelineBlock {
  public name: string = PushChanges.name;
  async process(database: DataBase): Promise<DataBase> {
    if (process.env.TRAVIS_BRANCH) {
      const git = sgit();
      console.log('Pushing changes to remote...');
      await git
        .addRemote('new-origin', `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.TRAVIS_REPO_SLUG}`)
        .then(() => git.push('new-origin', process.env.TRAVIS_BRANCH))
        .then(() => git.removeRemote('new-origin'));
    }
    return database;
  }
}
