import { Module } from '@nestjs/common';
import { AppointmentsService } from './service/appointments.service';
import { AppointmentsResolver } from './resolver/appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { AppointmentsRepository } from './appointments.repository/appointments.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Appointment])],
  providers: [AppointmentsResolver, AppointmentsService, AppointmentsRepository],
})
export class AppointmentsModule {}
