import path from 'path';
import rimraf from 'rimraf';

import { LocaleAwarePullRequest, PipelineConfig } from '../types';

export async function removePullrequests(pullRequest: LocaleAwarePullRequest, config: PipelineConfig) {
  rimraf.sync(path.join(config.dbpath, 'pull-requests'));
  return pullRequest;
}
