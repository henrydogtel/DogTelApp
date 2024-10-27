// src/modules/califications/califications.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalificationsService } from './califications.service';
import { CalificationsResolver } from './califications.resolver';
import { Calification } from './entities/calification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calification])],
  providers: [CalificationsService, CalificationsResolver],
  exports: [CalificationsService],
})
export class CalificationsModule {}
