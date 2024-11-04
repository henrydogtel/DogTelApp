import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/modules/user/dto/create-user.input';

@InputType()
export class UpdateSitterInput extends PartialType(CreateUserInput) { }
// export class UpdateSitterInput {
//   @Field(() => ID)
//   id: string;

//   @Field()
//   rate?: number;

//   @Field()
//   fee?: number;
// }
