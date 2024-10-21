import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentInput } from '../dto/create-appointment.input';

@Injectable()
export class AppointmentsRepository {

    constructor(@InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>) {}

    createAppointment = async (appointment: CreateAppointmentInput) => {
        
    }
}
