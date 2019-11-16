import { Locale } from './locale';

export type WithLocale<T> = {
  [key in Locale]: T;
};
