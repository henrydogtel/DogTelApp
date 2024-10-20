import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialInput } from './dto/create-credential.input';
import { UpdateCredentialInput } from './dto/update-credential.input';
import { Credentials } from './entities/credential.entity';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialsRepository: CredentialsRepository) { }

  async create(createCredentialInput: CreateCredentialInput): Promise<Credentials> {
    return this.credentialsRepository.create(createCredentialInput);
  }

  async findAll(): Promise<Credentials[]> {
    return this.credentialsRepository.findAll();
  }

  async findOne(id: string): Promise<Credentials> {
    return this.credentialsRepository.findOne(id);
  }

  async update(id: string, updateCredentialInput: UpdateCredentialInput): Promise<Credentials> {
    return this.credentialsRepository.update(id, updateCredentialInput);
  }

  async remove(id: string): Promise<Credentials> {
    return this.credentialsRepository.remove(id);
  }
  async findOneByEmail(email: string): Promise<Credentials> {
    return this.credentialsRepository.findOne(email);
  }


}
