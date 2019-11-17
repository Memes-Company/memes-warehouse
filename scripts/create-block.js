const fs = require('fs');
const path = require('path');

const blockFileName = process.argv[2];

if (!blockFileName) {
  console.log('usage: node create-block.js <blockname>');
  process.exit(0);
}
const blockClassName = blockFileName.split('-').reduce((result, current) => {
  return result + current.charAt(0).toUpperCase() + current.slice(1);
}, '');

const blocksPath = path.join(__dirname, '../src/blocks');
const templatePath = path.join(blocksPath, 'block.template');
const resultPath = path.join(blocksPath, `${blockFileName}.ts`);
const template = fs.readFileSync(templatePath, 'utf-8').replace(/%blockName%/g, blockClassName);
fs.writeFileSync(resultPath, template);
