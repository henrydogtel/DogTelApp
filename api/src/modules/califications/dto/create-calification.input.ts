import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateCalificationDto {

  @Field(() => String)
  @IsUUID()
  userId: string;

  @Field(() => String)
  @IsUUID()
  sitterId: string;
  
  @Field(() => Int)
  @Min(1)
  @Max(5)
  rate: number;

  @Field({ nullable: true })
  @IsOptional()
  comment?: string;
}
