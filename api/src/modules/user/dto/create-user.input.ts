import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  firstname: string;

  @Field()
  @IsString()
  lastname: string;

  @Field()
  @IsDate()
  birthdate: Date;

  @Field()
  @IsString()
  address: string;

  @Field(() => String)
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => String)
  @IsString() // Se supone que credentialsId es un username, así que lo cambie a String.
  credentialsId: string;

  @Field(() => String)
  @IsString() // Cambia esto según tus requerimientos.
  password: string;

  @Field(() => String)
  @IsString() // Cambia esto según tus requerimientos.
  passport: string;

  @Field(() => String)
  @IsString() // Cambia esto según tus requerimientos.
  email: string;

  @Field(() => [String], { nullable: true })
  paymentDataIds?: string[];
}