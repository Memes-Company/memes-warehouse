import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128 })
  title: string;

  @Column('text')
  description: string;
}
