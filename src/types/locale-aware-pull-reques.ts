import { Locale } from './locale';
import { PullRequest } from './pull-request';

export type LocaleAwarePullRequest = {
  [key in Locale]?: PullRequest;
} & {
  locales: Locale[];
};
