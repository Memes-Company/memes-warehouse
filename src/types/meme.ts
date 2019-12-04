export interface Meme {
  id?: string;
  title: string;
  description: string;
  tags?: (string)[] | null;
  source: {
    type: 'image' | 'link';
    value: string;
  };
}
