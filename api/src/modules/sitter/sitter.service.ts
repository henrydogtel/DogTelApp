import { Injectable } from '@nestjs/common';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';

@Injectable()
export class SitterService {
  create(createSitterInput: CreateSitterInput) {
    return 'This action adds a new sitter';
  }

  findAll() {
    return `This action returns all sitter`;
  }

  findOne(id: string) {
    return `This action returns a #${id} sitter`;
  }

  update(id: string, updateSitterInput: UpdateSitterInput) {
    return `This action updates a #${id} sitter`;
  }

  remove(id: string) {
    return `This action removes a #${id} sitter`;
  }
}
