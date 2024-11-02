import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class LoginResponse {

    @Field(() => User)
    user: User;
    
    @Field(() => String)
    @IsNotEmpty({ message: 'The access token is required' }) 
    @IsString({ message: 'The access token must be a string' })
    access_token: string;
    
    @Field(() => String)
    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail({}, { message: 'A valid email must be provided' })
    email: string;
    
    @Field(() => String)
    role: string;
}
