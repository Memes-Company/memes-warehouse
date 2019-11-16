const fs = require('fs');
const path = require('path');
const { PullRequestsPipeline } = require('../dist/pr-pipeline');
const dbpath = path.join(__dirname, '../db');

let pipeline = new PullRequestsPipeline({ dbpath });
pipeline.run();
