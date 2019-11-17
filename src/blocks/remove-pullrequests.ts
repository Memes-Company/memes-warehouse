import path from 'path';
import rimraf from 'rimraf';

import { DataSet, LocaleAwarePullRequest, PipelineBlock, PipelineConfig } from '../types';

export class RemovePullrequests extends PipelineBlock {
  public name: string;
  async process(dataset: DataSet, currentPullRequest: LocaleAwarePullRequest): Promise<DataSet> {
    rimraf.sync(path.join(this.config.dbpath, 'pull-requests', `${currentPullRequest.id}.json`));
    return Promise.resolve(dataset);
  }
}
