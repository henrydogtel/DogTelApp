import { typeRace } from '../entities/dog.entity';
export declare class CreateDogInput {
    name: string;
    birthdate: Date;
    images?: string[];
    race: string;
    size: typeRace;
}
