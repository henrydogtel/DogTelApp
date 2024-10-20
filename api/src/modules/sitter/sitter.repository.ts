import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sitter } from './entities/sitter.entity';
import { CreateSitterInput } from './dto/create-sitter.input';
import { UpdateSitterInput } from './dto/update-sitter.input';

@Injectable()
export class SitterRepository {
  constructor(
    @InjectRepository(Sitter)
    private readonly sitterRepository: Repository<Sitter>,
  ) {}

 
  async create(createSitterInput: CreateSitterInput): Promise<Sitter> {
    const newSitter = this.sitterRepository.create(createSitterInput);
    return this.sitterRepository.save(newSitter);
  }


  async findAll(): Promise<Sitter[]> {
    return this.sitterRepository.find();
  }

 
  async findOne(id: string): Promise<Sitter> {
    return this.sitterRepository.findOne({ where: { id: id } });
  }

  
  async update(id: string, updateSitterInput: UpdateSitterInput): Promise<Sitter> {
    const sitterToUpdate = await this.findOne(id);
    if (!sitterToUpdate) {
      throw new Error('Sitter not found');
    }
    Object.assign(sitterToUpdate, updateSitterInput);
    return this.sitterRepository.save(sitterToUpdate);
  }


  async remove(id: string): Promise<Sitter> {
    const sitterToRemove = await this.findOne(id);
    if (!sitterToRemove) {
      throw new Error('Sitter not found');
    }
    return this.sitterRepository.remove(sitterToRemove);
  }
}
