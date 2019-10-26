import { run } from '../src/pr-pipeline';
const path = require('path');

const config = {
  dbpath: path.join(__dirname, '../db'),
};

it('can create new tags', async () => {
  const pr = await run(path.join(__dirname, './fixtures/pr-with-new-tags.json'), config);
  expect(pr.meme.title).toBeTruthy;
});
