import { User } from 'src/modules/user/entities/user.entity';
export declare class Credentials {
    id: string;
    password: string;
    passport?: string;
    email: string;
    verified: boolean;
    user: User;
    sitter: User;
}
