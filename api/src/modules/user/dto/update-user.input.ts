import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';


@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {

    @Field(() => Boolean, { nullable: true })
    isActive?: boolean;
}
