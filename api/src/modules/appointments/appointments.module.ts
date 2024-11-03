import { Module } from '@nestjs/common';
import { AppointmentsService } from './service/appointments.service';
import { AppointmentsResolver } from './resolver/appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Sitter } from '../sitter/entities/sitter.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Sitter, User])],
  providers: [AppointmentsResolver, AppointmentsService],
})
export class AppointmentsModule {}
