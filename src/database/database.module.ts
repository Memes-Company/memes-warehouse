import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemeService } from './services/memes/memes.service';
import { Meme } from './entities/meme.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Meme])],
  providers: [MemeService],
})
export class DatabaseModule {}
