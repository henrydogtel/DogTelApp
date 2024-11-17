import { AuthRepository } from './auth.repository';
import { Credentials } from '../credentials/entities/credential.entity';
import { User } from '../user/entities/user.entity';
export declare class AuthService {
    private readonly authRepository;
    constructor(authRepository: AuthRepository);
    validateUser(email: string, password: string): Promise<any>;
    login(user: Partial<Credentials>): Promise<{
        access_token: string;
        email: string;
        role: import("../../enums/user-role.enum").UserRole;
        user: User;
    }>;
}
