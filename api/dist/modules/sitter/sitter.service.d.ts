import { UpdateSitterInput } from './dto/update-sitter.input';
import { Sitter } from './entities/sitter.entity';
import { Repository } from 'typeorm';
import { CredentialsRepository } from '../credentials/credentials.repository';
import { AuthRepository } from '../auth/auth.repository';
import { UserRole } from 'src/enums/user-role.enum';
export declare class SitterService {
    private readonly sitterRepository;
    private readonly credentialRepository;
    private readonly authService;
    constructor(sitterRepository: Repository<Sitter>, credentialRepository: CredentialsRepository, authService: AuthRepository);
    create(firstname: string, lastname: string, birthdate: Date, address: string, role: UserRole | null, password: string, email: string, fee: number, descripcion: string): Promise<Sitter>;
    findAll(): Promise<Sitter[]>;
    findOne(id: string): Promise<Sitter>;
    findOneByEmail(email: string): Promise<Sitter>;
    updateUserImage(id: string, userImg: string): Promise<Sitter>;
    update(id: string, updateSitterInput: Partial<UpdateSitterInput>): Promise<Sitter>;
    removeSitter(id: string): Promise<boolean>;
}
