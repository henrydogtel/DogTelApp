import { Module } from '@nestjs/common';
import { AppointmentsService } from './service/appointments.service';
import { AppointmentsResolver } from './resolver/appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Sitter } from '../sitter/entities/sitter.entity';
import { User } from '../user/entities/user.entity';
import { Dog } from '../dogs/entities/dog.entity';
import { AppointmentDetail } from '../appointment_details/entities/appointment_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Sitter, User,Dog, AppointmentDetail])],
  providers: [AppointmentsResolver, AppointmentsService],
})
export class AppointmentsModule {}
