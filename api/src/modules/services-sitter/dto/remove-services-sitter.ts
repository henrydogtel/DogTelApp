import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveServicesSitter {
  @Field()
  success: boolean;

  @Field()
  message?: string;
}
