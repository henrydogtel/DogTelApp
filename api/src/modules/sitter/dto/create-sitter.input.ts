import { InputType, Field } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';
import { IsInt, IsString } from 'class-validator';



@InputType()
export class CreateSitterInput extends CreateUserInput {

  // @Field(() => Number)
  // @IsInt()
  // rate: number;

  @Field(() => Number)
  @IsInt()
  fee: number;  // Cuota


  @Field(() => String)
  descripcion: string

}