import { InputType, PartialType, Field, Int } from '@nestjs/graphql';
import { CreateCalificationDto } from './create-calification.input';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class UpdateCalificationDto extends PartialType(CreateCalificationDto) {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  @Max(5)
  rate?: number;

  @Field({ nullable: true })
  @IsOptional()
  comment?: string;
}
