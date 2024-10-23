import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentDetailInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
