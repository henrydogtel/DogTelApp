import { CredentialsService } from '../credentials/credentials.service';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from '../credentials/entities/credential.entity';
export declare class AuthRepository {
    private readonly credentialsService;
    private readonly jwtServiceRepository;
    constructor(credentialsService: CredentialsService, jwtServiceRepository: JwtService);
    findOneByEmail(email: string): Promise<Credentials | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
    generateToken(payload: {
        email: string;
        sub: string;
    }): string;
}
