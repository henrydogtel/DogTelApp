import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentDetailsService } from './appointment_details.service';
import { AppointmentDetail } from './entities/appointment_detail.entity';
import { CreateAppointmentDetailInput } from './dto/create-appointment_detail.input';
import { UpdateAppointmentDetailInput } from './dto/update-appointment_detail.input';

@Resolver(() => AppointmentDetail)
export class AppointmentDetailsResolver {
  constructor(private readonly appointmentDetailsService: AppointmentDetailsService) {}

  @Mutation(() => AppointmentDetail)
  createAppointmentDetail(@Args('createAppointmentDetailInput') createAppointmentDetailInput: CreateAppointmentDetailInput) {
    return this.appointmentDetailsService.create(createAppointmentDetailInput);
  }

  @Query(() => [AppointmentDetail], { name: 'appointmentDetails' })
  findAll() {
    return this.appointmentDetailsService.findAll();
  }

  @Query(() => AppointmentDetail, { name: 'appointmentDetail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentDetailsService.findOne(id);
  }

  @Mutation(() => AppointmentDetail)
  updateAppointmentDetail(@Args('updateAppointmentDetailInput') updateAppointmentDetailInput: UpdateAppointmentDetailInput) {
    return this.appointmentDetailsService.update(updateAppointmentDetailInput.id, updateAppointmentDetailInput);
  }

  @Mutation(() => AppointmentDetail)
  removeAppointmentDetail(@Args('id', { type: () => Int }) id: number) {
    return this.appointmentDetailsService.remove(id);
  }
}
