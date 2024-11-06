import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCredentialInput {
  @Field(() => String, { description: 'Esta es la contrasena del usuario' })
  password: string;

  @Field(() => String, { description: 'Email del usuario' })
  email: string;
 
  @Field(()=> Boolean, {description: 'Estado de la cuenta'})
  isActive: boolean;
}
