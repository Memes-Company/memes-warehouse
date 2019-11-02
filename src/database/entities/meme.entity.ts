import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Locale } from '../models/pull-request';

@Entity('memes')
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  locale: Locale;

  @Column({ length: 128 })
  title: string;

  @Column('text')
  description: string;

  @Column('simple-json')
  source: MemeSource;
}

export interface MemeSource {
  type: string;
  value: string;
}
