import { Injectable } from '@nestjs/common';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';
import { SitterServiceRepository } from './sitter-repository';
import { ServicesSitter } from './entities/services-sitter.entity';

@Injectable()
export class ServicesSitterService {
  constructor(private readonly sitterServiceRepository: SitterServiceRepository) { }

  async create(sitter_id: string, createServicesSitterInput: CreateServicesSitterInput) {
    try {
      return await this.sitterServiceRepository.createService(sitter_id, createServicesSitterInput)
    } catch (error) {
      throw error
    }
  }

  findAll(): Promise<ServicesSitter[]> {
    return this.sitterServiceRepository.findAll();
  }

  findOne(id: string) {
    return this.sitterServiceRepository.findOne(id);
  }

  async update(id: string, updateServicesSitterInput: UpdateServicesSitterInput): Promise<ServicesSitter> {
    return await this.sitterServiceRepository.updateService(id, updateServicesSitterInput);
  }

  async removeService(id: string): Promise<boolean> {
    try {
      const service = await this.sitterServiceRepository.findOne(id)
      await this.sitterServiceRepository.removeService(id)
      return true
    } catch (error) {
      return false
    };
  }
}
