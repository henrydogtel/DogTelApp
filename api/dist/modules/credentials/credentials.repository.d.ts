import { Repository } from 'typeorm';
import { Credentials } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';
import { UpdateCredentialInput } from './dto/update-credential.input';
export declare class CredentialsRepository {
    private readonly repository;
    constructor(repository: Repository<Credentials>);
    create(createCredentialInput: CreateCredentialInput): Promise<Credentials>;
    findAll(): Promise<Credentials[]>;
    findOne(id: string): Promise<Credentials>;
    update(id: string, updateCredentialInput: UpdateCredentialInput): Promise<Credentials>;
    remove(id: string): Promise<Credentials>;
}
