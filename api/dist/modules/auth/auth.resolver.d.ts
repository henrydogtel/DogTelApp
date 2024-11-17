import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<LoginResponse>;
}
