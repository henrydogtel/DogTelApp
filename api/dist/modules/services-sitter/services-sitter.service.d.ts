import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';
import { SitterServiceRepository } from './sitter-repository';
import { ServicesSitter } from './entities/services-sitter.entity';
export declare class ServicesSitterService {
    private readonly sitterServiceRepository;
    constructor(sitterServiceRepository: SitterServiceRepository);
    create(sitter_id: string, createServicesSitterInput: CreateServicesSitterInput): Promise<ServicesSitter>;
    findAll(): Promise<ServicesSitter[]>;
    findOne(id: string): Promise<ServicesSitter>;
    update(id: string, updateServicesSitterInput: UpdateServicesSitterInput): Promise<ServicesSitter>;
    removeService(id: string): Promise<boolean>;
}
