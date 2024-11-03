import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { ServicesSitter } from './entities/services-sitter.entity';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';

@Injectable()
export class SitterServiceRepository {
  constructor(
    @InjectRepository(ServicesSitter)
    private readonly serviceRepository: Repository<ServicesSitter>,
  ) {}

  async createService(
    sitter_id: string,
    createServicesSitterInput: CreateServicesSitterInput,
  ): Promise<ServicesSitter> {
    const { name, description } = createServicesSitterInput;

    try {
      const serviceCreated = this.serviceRepository.create({
        name,
        description,
      });
      if (!serviceCreated)
        throw new BadRequestException('Error at create service');

      const serviceSaved = await this.serviceRepository.save(serviceCreated);
      return serviceCreated;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<ServicesSitter[]> {
    try {
      const services = await this.serviceRepository.find();
      if (!services.length) throw new NotFoundException('Services not found');
      return services;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<ServicesSitter> {
    try {
      const serviceById = await this.serviceRepository.findOne({
        where: { id },
      });
      if (!serviceById)
        throw new NotFoundException('the service was not found');
      return serviceById;
    } catch (error) {
      throw error;
    }
  }

  async updateService(
    id: string,
    updateServicesSitterInput: UpdateServicesSitterInput,
  ): Promise<ServicesSitter> {
    try {
      const service = await this.findOne(id);
      if (!service) throw new NotFoundException('The service was not found');
      await this.serviceRepository.update(id, updateServicesSitterInput);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async removeService(id: string): Promise<boolean> {
    try {
      const service = await this.findOne(id);
      if (!service) {
        throw new NotFoundException(
          'The service to remove it could not be found',
        );
      }
      await this.serviceRepository.remove(service);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
