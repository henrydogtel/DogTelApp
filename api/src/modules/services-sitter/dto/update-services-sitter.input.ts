import { CreateServicesSitterInput } from './create-services-sitter.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateServicesSitterInput extends PartialType(CreateServicesSitterInput) {
  @Field(() => Int)
  id: number;
}
