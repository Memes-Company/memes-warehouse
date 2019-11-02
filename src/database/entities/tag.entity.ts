import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Locale } from '../models/pull-request';
import { Meme } from './meme.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  locale: Locale;
  @Column({ length: 128 })
  title: string;
  @ManyToMany(type => Meme, meme => meme.tags)
  @JoinTable()
  memes: Meme[];
}
