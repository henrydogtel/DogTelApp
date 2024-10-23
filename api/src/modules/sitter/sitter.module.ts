import { Module } from '@nestjs/common';
import { SitterService } from './sitter.service';
import { SitterResolver } from './sitter.resolver';
import { Sitter } from './entities/sitter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([Sitter])],
  providers: [SitterResolver, SitterService],
})
export class SitterModule {}
