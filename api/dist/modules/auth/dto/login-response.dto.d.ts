import { User } from 'src/modules/user/entities/user.entity';
export declare class LoginResponse {
    user: User;
    access_token: string;
    email: string;
    role: string;
}
