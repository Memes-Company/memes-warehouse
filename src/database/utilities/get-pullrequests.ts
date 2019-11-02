import fs = require('fs');
import path = require('path');
import { PullRequest } from '../models/pull-request';

export function getPullrequests(pullrequestsDir: string) {
  return fs
    .readdirSync(pullrequestsDir, {
      encoding: 'utf-8',
    })
    .filter(e => e.endsWith('.json'))
    .map(filename => {
      return JSON.parse(
        fs.readFileSync(path.join(pullrequestsDir, filename), 'utf-8'),
      ) as PullRequest;
    });
}
