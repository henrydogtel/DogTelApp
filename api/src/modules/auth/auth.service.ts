import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Credentials } from '../credentials/entities/credential.entity';
import { CreateUserInput } from '../user/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) { }

  async validateUser(email: string, password: string): Promise<Partial<Credentials>> {
    const credentials = await this.authRepository.findOneByEmail(email);
    if (credentials) {
      console.log('Found credentials:', credentials);
      const isValidPassword = await this.authRepository.validatePassword(password, credentials.password);
      console.log('Password valid:', isValidPassword);
      if (isValidPassword) {
        const { password, ...result } = credentials;
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<Credentials>) {
    const payload = { email: user.email, sub: user.id };
    try {
      const access_token = await this.authRepository.generateToken(payload);
      return {
        access_token,
        email: user.email,
      };
    } catch (error) {
      console.error('Error generating token:', error.message)
      throw new Error('Error generating token');
    }
  }
}
