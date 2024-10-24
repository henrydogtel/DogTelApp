import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResolver } from './dogs.resolver';
import { DogsRepository } from './dogs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Dog])],
  providers: [DogsResolver, DogsService, DogsRepository],
})
export class DogsModule {}