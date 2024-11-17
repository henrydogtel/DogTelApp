import { UserRole } from 'src/enums/user-role.enum';
export declare class Person {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: Date;
    address?: string;
    role?: UserRole;
    userImg: string;
}
