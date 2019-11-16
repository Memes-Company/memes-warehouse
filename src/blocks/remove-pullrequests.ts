import rimraf from 'rimraf';

import { LocaleAwarePullRequest, PipelineConfig } from '../types';

export async function removePullrequests(pullRequest: LocaleAwarePullRequest, config: PipelineConfig) {
  rimraf.sync(config.pullrequestsDir);
  return pullRequest;
}
