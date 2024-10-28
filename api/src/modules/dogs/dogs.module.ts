import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResolver } from './dogs.resolver';
import { DogsRepository } from './dogs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Dog])],
  providers: [DogsResolver, DogsService, DogsRepository, UserRepository],
})
export class DogsModule {}
