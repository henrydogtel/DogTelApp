import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { Status } from 'src/enums/status.enum';
import { UserRole } from 'src/enums/user-role.enum';

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

  @Field(() => String, { nullable: true })
  @IsEnum(UserRole)
  role?: UserRole;

  @Field(() => Status, { nullable: true })
  @IsEnum(Status)
  status?: Status

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => Number)
  @IsInt()
  fee?: number;

}
