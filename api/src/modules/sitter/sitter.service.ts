import { Injectable } from '@nestjs/common';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';
import { SitterRepository } from './sitter.repository';

@Injectable()
export class SitterService {
  constructor(private readonly sitterRepository: SitterRepository) {}

  create(createSitterInput: CreateSitterInput) {
    return this.sitterRepository.create(createSitterInput);
  }

  findAll() {
    return this.sitterRepository.findAll();
  }

  findOne(id: string) {
    return this.sitterRepository.findOne(id);
  }

  update(id: string, updateSitterInput: UpdateSitterInput) {
    return this.sitterRepository.update(id, updateSitterInput);
  }

  remove(id: string) {
    return this.sitterRepository.remove(id);
  }
}
