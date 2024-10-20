import { CreateAppointmentDetailInput } from './create-appointment_detail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentDetailInput extends PartialType(CreateAppointmentDetailInput) {
  @Field(() => Int)
  id: number;
}
