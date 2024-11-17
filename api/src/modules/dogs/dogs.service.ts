import { Injectable } from '@nestjs/common';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { DogsRepository } from './dogs.repository';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    private readonly dogsRepository: DogsRepository,
  ) { }

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
      await this.dogsRepository.removeDog(dog.id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateUserImage(id: string, images: string[]): Promise<Dog> {
    const dog = await this.dogRepository.findOne({ where: { id } });
    if (!dog) {
      throw new Error('Dog not found');
    }
    dog.images = images;
    return this.dogRepository.save(dog);
  }
}
