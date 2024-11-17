import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { UserRepository } from '../user/user.repository';
export declare class DogsRepository {
    private readonly dogsRepository;
    private readonly userRepository;
    constructor(dogsRepository: Repository<Dog>, userRepository: UserRepository);
    createDog(idUser: string, createDogInput: CreateDogInput): Promise<Dog>;
    findAll(idUser: string): Promise<Dog[]>;
    findOne(id: string): Promise<Dog>;
    updateDog(id: string, updateDogInput: UpdateDogInput): Promise<Dog>;
    removeDog(id: string): Promise<boolean>;
}
