export interface PullRequest {
  meme: Meme;
  tags?: (Tag)[] | null;
}
export interface Meme {
  id?: string;
  title: TranslatedString;
  description: TranslatedString;
  tags?: (string)[] | null;
}
export type Locale = 'en' | 'ru';

export interface TranslatedString {
  ru: string;
  en: string;
}

export interface Tag {
  id?: string;
  title: TranslatedString;
}
