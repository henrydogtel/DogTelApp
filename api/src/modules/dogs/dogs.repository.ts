import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { CreateDogInput } from './dto/create-dog.input';

@Injectable()
export class DogsRepository {
    constructor(@InjectRepository(Dog) private readonly dogsRepository: Repository<Dog>){}

    createDog = async (idUser:String,createDogInput:CreateDogInput):Promise<Dog> => {
        const {name,birthdate,race,size,images} = createDogInput 
        
        try {
            const dogCreated = this.dogsRepository.create({name,birthdate,race,size,images})
            if(!dogCreated) throw new BadRequestException('Hubo un error al crear el mascota')
            const dogSaved = await this.dogsRepository.save(dogCreated)
            if(!dogSaved) throw new BadRequestException('Hubo un error al guardar la mascota')
            return dogSaved
        } catch (error) {
            throw error
        }

    }
}
