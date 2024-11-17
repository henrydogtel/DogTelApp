import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialInput } from './dto/create-credential.input';
import { Credentials } from './entities/credential.entity';
import { Repository } from 'typeorm';
export declare class CredentialsService {
    private readonly credentialsRepository;
    private readonly credentialsRepositor;
    constructor(credentialsRepository: Repository<Credentials>, credentialsRepositor: CredentialsRepository);
    create(createCredentialInput: CreateCredentialInput): Promise<Credentials>;
    findAll(): Promise<Credentials[]>;
    findOneByEmail(email: string): Promise<Credentials | null>;
}
