import { Injectable } from '@nestjs/common';
import { CreateAppointmentDetailInput } from './dto/create-appointment_detail.input';
import { UpdateAppointmentDetailInput } from './dto/update-appointment_detail.input';

@Injectable()
export class AppointmentDetailsService {
  create(createAppointmentDetailInput: CreateAppointmentDetailInput) {
    return 'This action adds a new appointmentDetail';
  }

  findAll() {
    return `This action returns all appointmentDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointmentDetail`;
  }

  update(id: number, updateAppointmentDetailInput: UpdateAppointmentDetailInput) {
    return `This action updates a #${id} appointmentDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointmentDetail`;
  }
}
