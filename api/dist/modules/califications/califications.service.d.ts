import { Repository } from 'typeorm';
import { Calification } from './entities/calification.entity';
import { CreateCalificationDto } from './dto/create-calification.input';
import { Sitter } from '../sitter/entities/sitter.entity';
export declare class CalificationsService {
    private readonly calificationsRepository;
    private readonly sittersRepository;
    constructor(calificationsRepository: Repository<Calification>, sittersRepository: Repository<Sitter>);
    createCalification(createCalificationDto: CreateCalificationDto): Promise<Calification>;
    private updateSitterRate;
}
