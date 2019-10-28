import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('memes')
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128 })
  title: string;

  @Column('text')
  description: string;
}
