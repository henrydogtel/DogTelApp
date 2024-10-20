import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '../credentials/entities/credential.entity';
import { CreateCredentialInput } from '../credentials/dto/create-credential.input';
import { CreateUserInput } from '../user/dto/create-user.input';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthRepository {
    constructor(
        private readonly credentialsService: CredentialsService,
        private readonly jwtService: JwtService,
    ) { }

    async findOneByEmail(email: string): Promise<Credentials> {
        return this.credentialsService.findOneByEmail(email);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async generateToken(payload): Promise<string> {
        return this.jwtService.sign(payload);
    }

    // async register(credentials: CreateCredentialInput): Promise<Credentials> {
    //     return this.credentialsService.create(credentials);
    // }

}
