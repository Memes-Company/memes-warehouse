import sgit from 'simple-git/promise';

export async function gitCommit(message) {
  return sgit().commit(message);
}
