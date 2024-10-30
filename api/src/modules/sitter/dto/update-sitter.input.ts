import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSitterInput {
  @Field(() => ID)
  id: string;

  @Field()
  rate?: number;

  @Field()
  fee?: number;
}
