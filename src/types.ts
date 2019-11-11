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
