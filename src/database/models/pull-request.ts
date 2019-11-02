import { Meme } from '../entities/meme.entity';

export type Locale = 'en' | 'ru';
export type PullRequest = {
  [key in Locale]?: LocalizedPullRequest;
} & {
  locales: Locale[];
};

export interface LocalizedPullRequest {
  meme: Meme;
  tags: string[];
}
