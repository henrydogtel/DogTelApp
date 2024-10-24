import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateServicesSitterInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
