import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Credentials } from '../credentials/entities/credential.entity';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async validateUser(email: string, password: string): Promise<any> {
    const credentials = await this.authRepository.findOneByEmail(email);
    if (credentials) {
      const isValidPassword = await this.authRepository.validatePassword(
        password,
        credentials.password,
      );
      if (isValidPassword) {
        const { password, ...result } = credentials;
        return result;
      }
    }
    return null;
  }

  async login(user: Partial<Credentials>) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.sitter ? user.sitter && user.sitter.role : user.user.role,
    };
    console.log(user);

    try {
      const access_token = this.authRepository.generateToken(payload);
      return {
        access_token,
        email: user.email,
        role: user.sitter ? user.sitter && user.sitter.role : user.user.role,
        user: user.sitter ? user.sitter : user.user && user.user,
      };
    } catch (error) {
      console.error('Error generating token:', error.message);
      throw new Error('Error generating token');
    }
  }
}
