import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class RemoveSitterResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
