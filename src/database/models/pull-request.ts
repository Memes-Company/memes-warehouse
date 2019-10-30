export type Locale = 'en' | 'ru';

export type PullRequest = {
  [key in Locale]?: Meme;
} & {
  locales: Locale[];
};

export interface Meme {
  title: string;
  description: string;
  source: Source;
}

export interface Source {
  type: string;
  value: string;
}
