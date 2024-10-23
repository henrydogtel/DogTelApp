import { Injectable } from '@nestjs/common';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { DogsRepository } from './dogs.repository';
import { Dog } from './entities/dog.entity';

@Injectable()
export class DogsService {

  constructor(private readonly dogRepository:DogsRepository){}


  async createDog(idUser:String, createDogInput: CreateDogInput):Promise<Dog> {
   
    try {
      return await this.dogRepository.createDog(idUser,createDogInput)
    } catch (error) {
      throw error
    }


  }

  findAll() {
    return `This action returns all dogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogInput: UpdateDogInput) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
