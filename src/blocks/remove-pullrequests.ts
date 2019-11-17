import path from 'path';
import rimraf from 'rimraf';

import { DataSet, LocaleAwarePullRequest, PipelineBlock } from '../types';

export class RemovePullrequest extends PipelineBlock {
  public name: string = RemovePullrequest.name;
  async process(dataset: DataSet, currentPullRequest: LocaleAwarePullRequest): Promise<DataSet> {
    rimraf.sync(path.join(this.config.dbpath, 'pull-requests', `${currentPullRequest.id}.json`));
    return Promise.resolve(dataset);
  }
}
