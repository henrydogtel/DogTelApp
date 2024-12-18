import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveDogResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
