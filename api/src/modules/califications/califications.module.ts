import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalificationsService } from './califications.service';
import { CalificationsResolver } from './califications.resolver';
import { Calification } from './entities/calification.entity';
import { User } from '../user/entities/user.entity';
import { Sitter } from '../sitter/entities/sitter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calification,User,Sitter])],
  providers: [CalificationsService, CalificationsResolver],
  exports: [CalificationsService],
})
export class CalificationsModule {}
