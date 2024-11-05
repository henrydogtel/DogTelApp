import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCredentialInput } from './create-credential.input';
import { IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateCredentialInput extends PartialType(CreateCredentialInput) {
  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  credentialId?: string;
  @Field(() => String, { description: 'Esta es la contrasena del usuario' })
  password: string;

  @Field(() => String, { description: 'Email del usuario', nullable: true })
  email: string;
}