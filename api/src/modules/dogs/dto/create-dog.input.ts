import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, IsArray, ArrayNotEmpty } from 'class-validator';
import { typeRace } from '../entities/dog.entity'; 

@InputType()
export class CreateDogInput {
  @Field(() => String, { description: 'The name of the pet' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String, { description: 'The birthdate of the dog' })
  @IsDateString()
  birthdate: Date;

  @Field(() => [String], { description: 'List of image URLs for the dog' })
  @IsArray()
  @ArrayNotEmpty()
  images: string[];

  @Field(() => String, { description: 'Race of the dog' })
  @IsNotEmpty()
  @IsString()
  race: string;

  @Field(() => String, { description: 'Size of the dog' })
  @IsEnum(typeRace)
  size: typeRace;
}
