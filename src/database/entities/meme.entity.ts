import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Locale } from '../models/pull-request';
import { Tag } from './tag.entity';

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
  @ManyToMany(type => Tag, tag => tag.memes)
  tags: Tag[];
}

export interface MemeSource {
  type: string;
  value: string;
}
