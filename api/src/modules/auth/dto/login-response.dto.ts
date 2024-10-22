import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
    @Field(() => String)
    access_token: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    role:string
}
