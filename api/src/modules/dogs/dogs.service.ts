import { Injectable } from '@nestjs/common';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { DogsRepository } from './dogs.repository';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {

  constructor(private readonly dogRepository:DogsRepository){}


  async createDog(idUser:string, createDogInput: CreateDogInput):Promise<Dog> {
   
    try {
      return await this.dogRepository.createDog(idUser,createDogInput)
    } catch (error) {
      throw error
    }


  }

  findAll(idUser:string): Promise<Dog[]> {
    return this.dogRepository.findAll(idUser);
  }

  findOne(id: string): Promise<Dog> {
    return this.dogRepository.findOne(id);
  }

  async update(id: string, updateDogInput: UpdateDogInput): Promise<Dog> {
    return await this.dogRepository.updateDog(id, updateDogInput);
  }
  async removeDog(id: string): Promise<boolean> {
    try {
      const dog = await this.findOne(id); // Busca la mascota o lanza excepción
      await this.dogRepository.removeDog(id);
      return true; 
    } catch (error) {
      console.error(error); // Puedes usar un logger en lugar de console.error en producción
      return false; 
    }
  }
 
}
