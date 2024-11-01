import { ObjectType, Field } from '@nestjs/graphql';
import { Person } from 'src/global-entities/person.entity';
import { Sitter } from 'src/modules/sitter/entities/sitter.entity';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class LoginResponse {

    @Field(() => Person)
    user: User | Sitter

    @Field(() => String)
    access_token: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    role: string
}
