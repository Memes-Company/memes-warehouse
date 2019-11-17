import path from 'path';
import rimraf from 'rimraf';

import { DataBase, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class RemovePullrequest extends PipelineBlock {
  public name: string = RemovePullrequest.name;
  async process(database: DataBase, currentPullRequest: LocaleAwarePullRequest): Promise<DataBase> {
    rimraf.sync(path.join(this.config.dbpath, 'pull-requests', `${currentPullRequest.id}.json`));
    delete database.pullRequests[currentPullRequest.id];
    return Promise.resolve(database);
  }
}
