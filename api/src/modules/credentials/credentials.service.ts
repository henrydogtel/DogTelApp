import { Injectable } from '@nestjs/common';
import { CreateCredentialInput } from './dto/create-credential.input';
import { UpdateCredentialInput } from './dto/update-credential.input';

@Injectable()
export class CredentialsService {
  create(createCredentialInput: CreateCredentialInput) {
    return 'This action adds a new credential';
  }

  findAll() {
    return `This action returns all credentials`;
  }

  findOne(id: string) {
    return `This action returns a #${id} credential`;
  }

  update(id: string, updateCredentialInput: UpdateCredentialInput) {
    return `This action updates a #${id} credential`;
  }

  remove(id: string) {
    return `This action removes a #${id} credential`;
  }
}
