import { run } from '../ci/pr-pipeline';
const path = require('path');

const config = {
  dbpath: path.join(__dirname, '../db'),
};

it('can create new tags', () => {
  const pr = run(path.join(__dirname, './fixtures/pr-with-new-tags.json'), config);
  expect(pr.meme.title).toBeTruthy;
});
