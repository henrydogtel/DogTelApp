import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreateCalificationDto } from './create-calification.input';

@InputType()
export class UpdateCalificationDto extends PartialType(CreateCalificationDto) {
  @Field(() => Int, { nullable: true })
  rate?: number;

  @Field({ nullable: true })
  comment?: string;
}
