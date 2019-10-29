import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meme } from '../../entities/meme.entity';

@Injectable()
export class MemeService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
  ) {}

  findAll(): Promise<Meme[]> {
    return this.memeRepository.find();
  }
}
