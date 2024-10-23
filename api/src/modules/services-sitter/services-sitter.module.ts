import { Module } from '@nestjs/common';
import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitterResolver } from './services-sitter.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sitter } from '../sitter/entities/sitter.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Sitter]),],
  providers: [ServicesSitterResolver, ServicesSitterService],
})
export class ServicesSitterModule { }
