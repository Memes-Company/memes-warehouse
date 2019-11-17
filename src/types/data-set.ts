import { LocaleAwarePullRequest } from './locale-aware-pull-reques';
import { Meme } from './meme';
import { Tag } from './tag';
import { WithLocale } from './with-locale';

export interface DataSet {
  pullRequests: {
    [key: string]: LocaleAwarePullRequest;
  };
  memes: WithLocale<{ [key: string]: Meme }>;
  tags: WithLocale<{ [key: string]: Tag }>;
}
