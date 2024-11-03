import { CreateServicesSitterInput } from './create-services-sitter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

@InputType()
export class UpdateServicesSitterInput extends PartialType(
  CreateServicesSitterInput,
) {
  @Field(() => String)
  id: string = uuid();
}
