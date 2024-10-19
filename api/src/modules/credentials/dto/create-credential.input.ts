import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCredentialInput {

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  passport: string;

  @Field()
  email: string;

  @Field(() => Boolean)
  verified: boolean;
}
