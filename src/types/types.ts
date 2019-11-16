export type Locale = 'en' | 'ru';

export interface DataSet {
  PullRequests: { [key: string]: LocaleAwarePullRequest };
  Memes: WithLocale<Meme[]>;
  Tags: WithLocale<Tag[]>;
}
export type WithLocale<T> = { [key in Locale]: T };

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
