import { PullRequest, PipelineConfig } from '../types';
import rimraf from 'rimraf';

export async function removePullrequests(pullRequest: PullRequest, config: PipelineConfig) {
  rimraf.sync(config.pullrequestsDir);
  return pullRequest;
}
