const fs = require('fs');
const path = require('path');
const pipeline = require('../dist/pr-pipeline');
const jsonPath = path.join(__dirname, '../pr.json');

if (fs.existsSync(jsonPath)) {
  pipeline.run(jsonPath, { dbpath: path.join(__dirname, '../db') });
} else {
  console.log('Nothing to process');
}
