import { Meme } from './meme';

export interface PullRequest {
  meme: Meme;
  tags: string[];
}
