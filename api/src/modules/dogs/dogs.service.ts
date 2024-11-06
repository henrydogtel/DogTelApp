import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { DogsRepository } from './dogs.repository';
import { Dog } from './entities/dog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DogsService {
  constructor(private readonly dogsRepository: DogsRepository,
    @InjectRepository(Dog) private readonly dogRepository: Repository<Dog>) {}

  async createDog(
    idUser: string,
    createDogInput: CreateDogInput,
  ): Promise<Dog> {
    try {
      return await this.dogsRepository.createDog(idUser, createDogInput);
    } catch (error) {
      throw error;
    }
  }

  findAll(idUser: string): Promise<Dog[]> {
    return this.dogsRepository.findAll(idUser);
  }

  findOne(id: string): Promise<Dog> {
    return this.dogsRepository.findOne(id);
  }

  async update(id: string, updateDogInput: UpdateDogInput): Promise<Dog> {
    return await this.dogsRepository.updateDog(id, updateDogInput);
  }
  async removeDog(id: string): Promise<boolean> {
    try {
      const dog = await this.findOne(id);
      await this.dogsRepository.removeDog(id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async DogStatus(id: string, isActive: boolean): Promise<Dog> {
    try {
      const dog = await this.dogsRepository.findOne(id);
      if (!dog) {
        throw new NotFoundException('Dog not found');
      }
      dog.isActive = isActive;
      return await this.dogRepository.save(dog);
    } catch (error) {
      console.error('Error updating dog status:', error);
      throw new error(
        'An error occurred while updating the dog status. Please try again.',
      );
    }
  }
}
