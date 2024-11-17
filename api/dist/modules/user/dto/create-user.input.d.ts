import { UserRole } from 'src/enums/user-role.enum';
export declare class CreateUserInput {
    firstname: string;
    lastname: string;
    birthdate: Date;
    address: string;
    role?: UserRole;
    password: string;
    email: string;
}
