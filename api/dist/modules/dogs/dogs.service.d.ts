import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { DogsRepository } from './dogs.repository';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
export declare class DogsService {
    private readonly dogRepository;
    private readonly dogsRepository;
    constructor(dogRepository: Repository<Dog>, dogsRepository: DogsRepository);
    createDog(idUser: string, createDogInput: CreateDogInput): Promise<Dog>;
    findAll(idUser: string): Promise<Dog[]>;
    findOne(id: string): Promise<Dog>;
    update(id: string, updateDogInput: UpdateDogInput): Promise<Dog>;
    removeDog(id: string): Promise<boolean>;
    updateUserImage(id: string, images: string[]): Promise<Dog>;
}
