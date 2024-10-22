import { Injectable } from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialInput } from './dto/create-credential.input';
import { Credentials } from './entities/credential.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
    private readonly credentialsRepositor: CredentialsRepository) { }

  async create(createCredentialInput: CreateCredentialInput): Promise<Credentials> {
    return this.credentialsRepository.create(createCredentialInput);
  }

  async findAll(): Promise<Credentials[]> {
    return this.credentialsRepositor.findAll();
  }

  async findOneByEmail(email: string): Promise<Credentials | null> {
    return this.credentialsRepository.findOneBy({ email }); 
}

}
