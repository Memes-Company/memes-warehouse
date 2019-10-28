const fs = require('fs');
const path = require('path');
const pipeline = require('../dist/pr-pipeline');
const dbpath = path.join(__dirname, '../db');
const jsonPath = path.join(__dirname, '../pr.json');

if (fs.existsSync(jsonPath)) {
  pipeline.run({ dbpath, jsonPath });
} else {
  console.log('Nothing to process');
}
