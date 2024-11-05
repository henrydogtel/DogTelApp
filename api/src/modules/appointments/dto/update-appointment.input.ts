import { CreateAppointmentInput } from './create-appointment.input';
import { InputType, Field, Int, PartialType, ObjectType, } from '@nestjs/graphql';

@InputType()
export class UpdateAppointmentInput extends PartialType(
  CreateAppointmentInput,
) {
  @Field(() => Int)
  id: number;
}


@ObjectType()
export class ResponseAprobarAppointment {
  @Field(() => String)
  message:string

  @Field(() => Boolean)
  status: boolean
}
