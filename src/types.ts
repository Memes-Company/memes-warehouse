export type Locale = 'en' | 'ru';

export type LocaleAwarePullRequest = {
  [key in Locale]?: PullRequest;
} & {
  locales: Locale[];
};

export interface PullRequest {
  meme: Meme;
  tags: string[];
}

export interface Meme {
  id?: string;
  title: string;
  description: string;
  tags?: (string)[] | null;
}

export interface Tag {
  id?: string;
  title: string;
}

export interface PipelineConfig {
  dbpath: string;
  pullrequestsDir: string;
}
