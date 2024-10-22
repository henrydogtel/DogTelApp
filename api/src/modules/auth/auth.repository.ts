import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '../credentials/entities/credential.entity';


@Injectable()
export class AuthRepository {
    constructor(
        private readonly credentialsService: CredentialsService,
        private readonly jwtService: JwtService,
    ) { }

    async findOneByEmail(email: string): Promise<Credentials | null> {
        return this.credentialsService.findOneByEmail(email);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }


    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    generateToken(payload: { email: string; sub: string }) {
        return this.jwtService.sign(payload);
        console.log('Payload:', payload);
      }

    

}
