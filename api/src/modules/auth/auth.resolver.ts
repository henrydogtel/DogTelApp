import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Credentials } from '../credentials/entities/credential.entity';
import { LoginResponse } from './dto/login-response.dto';

@Resolver(() => Credentials)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string
  ): Promise<LoginResponse> {
    try {
      const user = await this.authService.validateUser(email, password);
      console.log(user);

      if (!user) {
        throw new Error('Invalid credentials');
      }
      return await this.authService.login(user);
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('An error occurred during login. Please check your credentials and try again.');
    }
  }
}

