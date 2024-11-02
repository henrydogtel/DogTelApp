import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentDetailsService } from './appointment_details.service';
import { AppointmentDetail } from './entities/appointment_detail.entity';
import { CreateAppointmentDetailInput } from './dto/create-appointment_detail.input';
import { UpdateAppointmentDetailInput } from './dto/update-appointment_detail.input';

@Resolver(() => AppointmentDetail)
export class AppointmentDetailsResolver {
  constructor(private readonly appointmentDetailsService: AppointmentDetailsService) {}

  @Mutation(() => AppointmentDetail)
  async createAppointmentDetail(@Args('createAppointmentDetailInput') createAppointmentDetailInput: CreateAppointmentDetailInput) {
    try {
      return await this.appointmentDetailsService.create(createAppointmentDetailInput);
    } catch (error) {
      console.error('Error creating appointment detail:', error);
      throw new Error('An error occurred while creating the appointment detail. Please try again.');
    }
  }

  @Query(() => [AppointmentDetail], { name: 'appointmentDetails' })
  async findAll() {
    try {
      return await this.appointmentDetailsService.findAll();
    } catch (error) {
      console.error('Error retrieving appointment details:', error);
      throw new Error('An error occurred while retrieving appointment details. Please try again.');
    }
  }

  @Query(() => AppointmentDetail, { name: 'appointmentDetail' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.appointmentDetailsService.findOne(id);
    } catch (error) {
      console.error(`Error finding appointment detail with ID ${id}:`, error);
      throw new Error('An error occurred while finding the appointment detail. Please try again.');
    }
  }

  @Mutation(() => AppointmentDetail)
  async updateAppointmentDetail(@Args('updateAppointmentDetailInput') updateAppointmentDetailInput: UpdateAppointmentDetailInput) {
    try {
      return await this.appointmentDetailsService.update(updateAppointmentDetailInput.id, updateAppointmentDetailInput);
    } catch (error) {
      console.error(`Error updating appointment detail with ID ${updateAppointmentDetailInput.id}:`, error);
      throw new Error('An error occurred while updating the appointment detail. Please try again.');
    }
  }

  @Mutation(() => AppointmentDetail)
  async removeAppointmentDetail(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.appointmentDetailsService.remove(id);
    } catch (error) {
      console.error(`Error removing appointment detail with ID ${id}:`, error);
      throw new Error('An error occurred while removing the appointment detail. Please try again.');
    }
  }
}

