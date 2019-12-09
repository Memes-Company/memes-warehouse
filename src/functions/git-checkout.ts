import sgit from 'simple-git/promise';

export async function gitCheckout(branch) {
  return sgit().checkout(branch)
}
