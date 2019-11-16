import { LocaleAwarePullRequest } from './locale-aware-pull-reques';
import { Meme } from './meme';
import { Tag } from './tag';
import { WithLocale } from './with-locale';

export interface DataSet {
  PullRequests: {
    [key: string]: LocaleAwarePullRequest;
  };
  Memes: WithLocale<Meme[]>;
  Tags: WithLocale<Tag[]>;
}
