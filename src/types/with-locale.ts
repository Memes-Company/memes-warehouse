import { Locales } from './locales';

export type WithLocale<T> = {
  [key in Locales]: T;
};
