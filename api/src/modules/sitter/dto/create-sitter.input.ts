import { InputType, Field } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateSitterInput extends CreateUserInput {
  @Field(() => Number)
  @IsInt()
  rate: number;

  @Field(() => Number)
  @IsInt()
  fee: number; 

  @Field(() => String)
  descripcion: string;

  @Field({ defaultValue: true })
  @IsBoolean({ message: 'The verification field must be boolean' })
  isActive: boolean;
}
