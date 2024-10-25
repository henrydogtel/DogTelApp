import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class LoginResponse {

    @Field(() => User)
    user:User
    
    @Field(() => String)
    access_token: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    role:string
}
