import { Resolver, Query, Mutation, Args, Int, } from '@nestjs/graphql';
import { AppointmentsService } from '../service/appointments.service';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentInput } from '../dto/create-appointment.input';
import { ResponseAprobarAppointment, UpdateAppointmentInput } from '../dto/update-appointment.input';
import { BadRequestException } from '@nestjs/common';

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
      throw error.message;
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
  async findOne(@Args('id', { type: () => String }) id: string) {
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
  async removeAppointment(@Args('id', { type: () => Int }) id: number
  ) {
    try {
      return await this.appointmentsService.remove(id);
    } catch (error) {
      console.error(`Error removing appointment with ID ${id}:`, error);
      throw new Error(
        'An error occurred while removing the appointment. Please try again.',
      );
    }
  }

  @Query(() => [Appointment])
  async getAppointmentsByIdUser(@Args('idUser', {type: () => String}) idUser:string):Promise<Appointment[]> {

    try {
      const appointments = await this.appointmentsService.getAppointmentsByIdUser(idUser)
      if(!appointments) throw new BadRequestException('Hubo un error al obtener los appointments')
      return appointments
    } catch (error) {
      throw new Error(error)
    }

  }

  @Query(() => [Appointment])
  async getAppointmentsByIdSitter(@Args('idSitter', {type: () => String}) idSitter:string) {
    try {
      const appointments = await this.appointmentsService.getAppointmentsByIdSitter(idSitter)
      if(!appointments) throw new BadRequestException('Hubo un error al obtener los appointments')
      return appointments
    } catch (error) {
      throw new Error(error)
    }
  }

  @Mutation(() => ResponseAprobarAppointment)
  async confirmAppointment(@Args('idAppointment', {type:() => String})idAppointment:string):Promise<ResponseAprobarAppointment> {
    
    try {
      const response = await this.appointmentsService.confirmAppointment(idAppointment)
      if(!response) throw new BadRequestException('Hubo un error al aceptar el appointment')
      return {message:'appointment approved', status:true}
    } catch (error) {
      throw error
    }
  }


  @Mutation(() => ResponseAprobarAppointment)
  async rejectAppointment(@Args('idAppointment', {type:() => String})idAppointment:string):Promise<ResponseAprobarAppointment> {
    
    try {
      const response = await this.appointmentsService.cancelAppointment(idAppointment)
      if(!response) throw new BadRequestException('Hubo un error al cancelar el appointment')
      return {message:'appointment cancelled', status:true}
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => String)
  async appointmentPaidConfirm(@Args('idAppointment', {type:() => String})idAppointment:string):Promise<String> {
    try {
      const response = await this.appointmentsService.appointmentPaidConfirm(idAppointment)
      if(!response) throw new BadRequestException("Hubo un error")
      return response
    } catch (error) {
      throw error
    }
  }



}
