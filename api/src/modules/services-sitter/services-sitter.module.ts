import { Module } from '@nestjs/common';
import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitterResolver } from './services-sitter.resolver';

@Module({
  providers: [ServicesSitterResolver, ServicesSitterService],
})
export class ServicesSitterModule {}
