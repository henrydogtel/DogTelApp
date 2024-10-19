import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentsService {

  constructor(@InjectRepository(Appointment) private repositoryAppointment: Repository<Appointment>) {

  }

  create(createAppointmentInput: CreateAppointmentInput) {

    
    return this.repositoryAppointment.save(createAppointmentInput);
  }

  findAll() {
    return this.repositoryAppointment.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}