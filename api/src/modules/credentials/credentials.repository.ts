import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credentials } from './entities/credential.entity';
import { CreateCredentialInput } from './dto/create-credential.input';
import { UpdateCredentialInput } from './dto/update-credential.input';

@Injectable()
export class CredentialsRepository {
    constructor(
        @InjectRepository(Credentials)
        private readonly repository: Repository<Credentials>,
    ) { }

    async create(createCredentialInput: CreateCredentialInput): Promise<Credentials> {
        const newCredential = this.repository.create(createCredentialInput);
        return this.repository.save(newCredential);
    }

    async findAll(): Promise<Credentials[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Credentials> {
        const credential = await this.repository.findOne({ where: { credentialId: id } });
        if (!credential) {
            throw new NotFoundException(`Credential with ID "${id}" not found`);
        }
        return credential;
    }

    async update(id: string, updateCredentialInput: UpdateCredentialInput): Promise<Credentials> {
        const credential = await this.findOne(id);
        Object.assign(credential, updateCredentialInput);
        return this.repository.save(credential);
    }

    async remove(id: string): Promise<Credentials> {
        const credential = await this.findOne(id);
        await this.repository.remove(credential);
        return credential;
    }
}
