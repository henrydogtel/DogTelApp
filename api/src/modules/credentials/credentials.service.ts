import { Injectable, NotFoundException } from '@nestjs/common';
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

    const credentials = await this.credentialsRepository.findOne({
      where: {
        email,
      }, relations: ['user', 'sitter']
    });

    return credentials
  }
  async update(userId: string, createCredentialInput: CreateCredentialInput): Promise<Credentials> {
    const credential = await this.credentialsRepository.findOne({
      where: { user: { id: userId } }
    });

    if (!credential) {
      throw new NotFoundException(`No se encontró la credencial para el usuario con ID ${userId}`);
    }
    Object.assign(credential, createCredentialInput);
    return this.credentialsRepository.save(credential);
  }


}
