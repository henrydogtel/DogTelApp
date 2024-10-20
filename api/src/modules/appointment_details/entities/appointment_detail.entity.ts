import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AppointmentDetail {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
