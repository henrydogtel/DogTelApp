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

  @Field()
  @IsUUID()
  credentialsId: string;

  @Field(() => [String], { nullable: true })
  paymentDataIds?: string[]; 
}
