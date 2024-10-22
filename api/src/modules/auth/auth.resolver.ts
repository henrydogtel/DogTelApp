import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Credentials } from '../credentials/entities/credential.entity';
import { User } from '../user/entities/user.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.service';

@Resolver(() => Credentials)
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ) {

    try {
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      return this.authService.login(user);
    } catch (error) {
      throw error
    }
  
  }

  // @Mutation(() => Credentials)
  // async register(
  //   @Args('email') email: string,
  //   @Args('username') username: string,
  //   @Args('password') password: string
  // ) {
  //   return this.authService.register(email, username, password);
  // }
 
}
