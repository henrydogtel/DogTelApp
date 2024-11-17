import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRole } from 'src/enums/user-role.enum';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    createUser(firstname: string, lastname: string, birthdate: Date, address: string, role: UserRole | null, password: string, email: string): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    updateUser(id: string, updateUserInput: UpdateUserInput): Promise<User>;
    removeUser(id: string): Promise<void>;
    findOneByEmail(email: string): Promise<User>;
    updateUserImage(id: string, userImg: string): Promise<User>;
}
