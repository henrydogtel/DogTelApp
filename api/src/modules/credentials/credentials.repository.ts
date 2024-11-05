import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  async create(
    createCredentialInput: CreateCredentialInput,
  ): Promise<Credentials> {
    const { password, email } = createCredentialInput;

    const newCredential = this.repository.create({ password, email });

    try {
      const credentialSaved = await this.repository.save(newCredential);
      if (!credentialSaved)
        throw new BadRequestException('Hubo un error al crear la credencial');
      return credentialSaved;
    } catch (error) {
      throw new error;
    }
  }

  async findAll(): Promise<Credentials[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Credentials> {
    const credential = await this.repository.findOne({ where: { id: id } });
    if (!credential) {
      throw new NotFoundException(`Credential with ID "${id}" not found`);
    }
    return credential;
  }

  async update(
    id: string,
    updateCredentialInput: UpdateCredentialInput,
  ): Promise<Credentials> {
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
