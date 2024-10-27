import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateCalificationDto {
  @Field(() => Int)
  @Min(1)
  @Max(5)
  rate: number;

  @Field()
  @IsUUID()
  userId: string;

  @Field()
  @IsUUID()
  sitterId: string;

  @Field({ nullable: true })
  comment?: string;
}
