import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCredentialInput } from './create-credential.input';
import { IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateCredentialInput extends PartialType(CreateCredentialInput) {
  @Field()
  @IsUUID()
  @IsOptional()
  credentialId?: string;
}
