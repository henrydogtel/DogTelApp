import { Injectable } from '@nestjs/common';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitter } from './entities/sitter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SitterService {
  constructor(@InjectRepository(Sitter) private readonly sitterRepository:Repository<Sitter>) {}

  create(createSitterInput: CreateSitterInput) {
    return ;
  }

  findAll() {
    return ;
  }

  findOne(id: string) {
    return ;
  }

  update(id: string, updateSitterInput: UpdateSitterInput) {
    return ;
  }

  remove(id: string) {
    return ;
  }
}
