import { CreateCredentialInput } from './create-credential.input';
declare const UpdateCredentialInput_base: import("@nestjs/common").Type<Partial<CreateCredentialInput>>;
export declare class UpdateCredentialInput extends UpdateCredentialInput_base {
    credentialId?: string;
    password: string;
    email: string;
}
export {};
