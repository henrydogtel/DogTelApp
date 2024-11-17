import { DogsService } from './dogs.service';
import { Dog } from './entities/dog.entity';
import { CreateDogInput } from './dto/create-dog.input';
import { UpdateDogInput } from './dto/update-dog.input';
import { RemoveDogResponse } from './dto/remove-dog.input';
export declare class DogsResolver {
    private readonly dogsService;
    constructor(dogsService: DogsService);
    createDog(idUser: string, createDogInput: CreateDogInput): Promise<Dog>;
    findAll(id: string): Promise<Dog[]>;
    findOne(id: string): Promise<Dog>;
    updateDog(updateDogInput: UpdateDogInput): Promise<Dog>;
    removeDog(id: string): Promise<RemoveDogResponse>;
    updateDogImage(id: string, images: string[]): Promise<Dog>;
}
