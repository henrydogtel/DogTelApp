import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { AuthRepository } from '../auth/auth.repository';
import { SendMailsService } from '../send-mails/send-mails.service';
export declare class UserService {
    private readonly userRepository;
    private readonly credentialRepository;
    private readonly authRepository;
    private readonly sendMailService;
    constructor(userRepository: Repository<User>, credentialRepository: CredentialsRepository, authRepository: AuthRepository, sendMailService: SendMailsService);
    updateUserImage(id: string, userImg: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserInput: UpdateUserInput): Promise<User>;
    removeUser(id: string): Promise<void>;
    uploadProfilePicture(userId: string, file: Express.Multer.File): Promise<User>;
}
