import { Module } from '@nestjs/common';
import path = require('path');
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot()],
})
export class DatabaseModule {}
