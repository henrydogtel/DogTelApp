import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCredentialInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  passport?: string;

  @Field({ defaultValue: false }) 
  verified?: boolean;
}
