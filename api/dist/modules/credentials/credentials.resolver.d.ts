import { CredentialsService } from './credentials.service';
import { Credentials } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';
export declare class CredentialsResolver {
    private readonly credentialsService;
    constructor(credentialsService: CredentialsService);
    createCredential(createCredentialInput: CreateCredentialInput): Promise<Credentials>;
    findAll(): Promise<Credentials[]>;
}
