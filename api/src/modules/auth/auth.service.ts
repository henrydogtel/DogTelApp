import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Credentials } from '../credentials/entities/credential.entity';
import { CreateUserInput } from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }

  async validateUser(email: string, password: string): Promise<Partial<Credentials>> {
    const credentials = await this.authRepository.findOneByEmail(email);
    if (credentials && await this.authRepository.validatePassword(password, credentials.password)) {
      const { password, ...result } = credentials;
      return result;
    }
    return null;
  }

  async login(user: Partial<Credentials>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.authRepository.generateToken(payload),
    };
  }

  // async register(email: string, username: string, password: string): Promise<Credentials> {
  //   const hashedPassword = await this.authRepository.hashPassword(password);
  //   return this.authRepository.register({
  //     email,
  //     username,
  //     password: hashedPassword,
  //   });
  // }

 
}
