import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';
import { Body } from '@nestjs/common';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Mutation(() => Appointment)
  createAppointment(@Args('createAppointment') createAppointment: CreateAppointmentInput) {
    console.log(createAppointment);

    
    
    return this.appointmentsService.create(createAppointment);
  }

  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentsService.findOne(id);
  }

  @Mutation(() => Appointment)
  updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return this.appointmentsService.update(updateAppointmentInput.id, updateAppointmentInput);
  }

  @Mutation(() => Appointment)
  removeAppointment(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentsService.remove(id);
  }
}
