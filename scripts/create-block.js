const fs = require('fs');
const path = require('path');

const blockName = process.argv[2];

if (!blockName) {
  console.log('usage: node create-block.js <blockname>');
}
const blocksPath = path.join(__dirname, '../src/blocks');
const templatePath = path.join(blocksPath, 'block.template');
const resultPath = path.join(blocksPath, `${blockName}.ts`);
const template = fs.readFileSync(templatePath, 'utf-8').replace('%blockName%', blockName);
fs.writeFileSync(resultPath, template);
