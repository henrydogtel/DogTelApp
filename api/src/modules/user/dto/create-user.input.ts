import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsEnum, IsString, IsUUID } from 'class-validator';
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

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => String)
  @IsString()
  email: string;
  
  @Field({ defaultValue: true })
  @IsBoolean({ message: 'The verification field must be boolean' })
  isActive?: boolean;

}
