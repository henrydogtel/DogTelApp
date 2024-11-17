import { CalificationsService } from './califications.service';
import { Calification } from './entities/calification.entity';
import { CreateCalificationDto } from './dto/create-calification.input';
export declare class CalificationsResolver {
    private readonly calificationsService;
    constructor(calificationsService: CalificationsService);
    createCalification(createCalificationDto: CreateCalificationDto): Promise<Calification>;
}
