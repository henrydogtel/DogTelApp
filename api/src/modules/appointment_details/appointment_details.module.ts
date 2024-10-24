import { Module } from '@nestjs/common';
import { AppointmentDetailsService } from './appointment_details.service';
import { AppointmentDetailsResolver } from './appointment_details.resolver';

@Module({
  providers: [AppointmentDetailsResolver, AppointmentDetailsService],
})
export class AppointmentDetailsModule {}
