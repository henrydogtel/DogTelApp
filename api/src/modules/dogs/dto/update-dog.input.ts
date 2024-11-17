import { CreateDogInput } from './create-dog.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { v4 as uuid } from 'uuid';

@InputType()
export class UpdateDogInput extends PartialType(CreateDogInput) {
  @Field(() => String)
  id: string = uuid();
}
