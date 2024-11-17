import { SitterService } from './sitter.service';
import { Sitter } from './entities/sitter.entity';
import { UpdateSitterInput } from './dto/update-sitter.input';
import { UserRole } from 'src/enums/user-role.enum';
import { RemoveSitterResponse } from './dto/remove-siterr.input';
export declare class SitterResolver {
    private readonly sitterService;
    constructor(sitterService: SitterService);
    createSitter(firstname: string, lastname: string, birthdate: Date, address: string, role: UserRole | null, password: string, email: string, fee: number, descripcion: string): Promise<Sitter>;
    findAll(): Promise<Sitter[]>;
    findOne(id: string): Promise<Sitter>;
    findOneByEmail(email: string): Promise<Sitter>;
    updateSitter(id: string, updateSitterInput: Partial<UpdateSitterInput>): Promise<Sitter>;
    updateSitterImage(id: string, userImg: string): Promise<Sitter>;
    removeSitter(id: string): Promise<RemoveSitterResponse>;
}
