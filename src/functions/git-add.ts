import sgit from 'simple-git/promise';

export async function gitAdd(files: string | string[]) {
  return sgit().add(files);
}
