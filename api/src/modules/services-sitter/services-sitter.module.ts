import { Module } from '@nestjs/common';
import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitterResolver } from './services-sitter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitter } from '../sitter/entities/sitter.entity';
import { SitterServiceRepository } from './sitter-repository';
import { ServicesSitter } from './entities/services-sitter.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Sitter,ServicesSitter]),],
  providers: [ServicesSitterResolver, ServicesSitterService,SitterServiceRepository],
})
export class ServicesSitterModule { }
