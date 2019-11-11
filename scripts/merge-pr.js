const fs = require('fs');
const path = require('path');
const { PullRequestsPipeline } = require('../dist/pr-pipeline');
const dbpath = path.join(__dirname, '../db');
const pullrequestsDir = path.join(__dirname, '../db/pull-requests');

if (fs.existsSync(pullrequestsDir)) {
  let pipeline = new PullRequestsPipeline({ dbpath, pullrequestsDir });
  pipeline.run();
} else {
  console.log('Nothing to process');
}
