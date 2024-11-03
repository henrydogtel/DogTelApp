import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { UpdateAppointmentInput } from '../dto/update-appointment.input';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('createAppointment') createAppointment: CreateAppointmentInput,
  ) {
    try {
      console.log(createAppointment);
      return await this.appointmentsService.create(createAppointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error(
        'An error occurred while creating the appointment. Please try again.',
      );
    }
  }

  @Query(() => [Appointment], { name: 'appointments' })
  async findAll() {
    try {
      return await this.appointmentsService.findAll();
    } catch (error) {
      console.error('Error retrieving appointments:', error);
      throw new Error(
        'An error occurred while retrieving appointments. Please try again.',
      );
    }
  }

  @Query(() => Appointment, { name: 'appointment' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.appointmentsService.findOne(id);
    } catch (error) {
      console.error(`Error finding appointment with ID ${id}:`, error);
      throw new Error(
        'An error occurred while finding the appointment. Please try again.',
      );
    }
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('updateAppointmentInput')
    updateAppointmentInput: UpdateAppointmentInput,
  ) {
    try {
      return await this.appointmentsService.update(
        updateAppointmentInput.id,
        updateAppointmentInput,
      );
    } catch (error) {
      console.error(
        `Error updating appointment with ID ${updateAppointmentInput.id}:`,
        error,
      );
      throw new Error(
        'An error occurred while updating the appointment. Please try again.',
      );
    }
  }

  @Mutation(() => Appointment)
  async removeAppointment(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.appointmentsService.remove(id);
    } catch (error) {
      console.error(`Error removing appointment with ID ${id}:`, error);
      throw new Error(
        'An error occurred while removing the appointment. Please try again.',
      );
    }
  }
}
