import { PullRequest, PipelineConfig } from '../types';
import fs from 'fs';
export async function parsePullRequest(pullRequest: PullRequest, config: PipelineConfig) {
  const json = fs.readFileSync(config.jsonPath, 'utf-8');
  pullRequest = JSON.parse(json);
  return pullRequest;
}
