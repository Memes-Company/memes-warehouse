import { Locales } from './locales';
import { PullRequest } from './pull-request';

export type LocaleAwarePullRequest = {
  [key in Locales]?: PullRequest;
} & {
  id: string;
  locales: Locales[];
};
