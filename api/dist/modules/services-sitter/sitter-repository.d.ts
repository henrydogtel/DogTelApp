import { Repository } from 'typeorm';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { ServicesSitter } from './entities/services-sitter.entity';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';
export declare class SitterServiceRepository {
    private readonly serviceRepository;
    constructor(serviceRepository: Repository<ServicesSitter>);
    createService(sitter_id: string, createServicesSitterInput: CreateServicesSitterInput): Promise<ServicesSitter>;
    findAll(): Promise<ServicesSitter[]>;
    findOne(id: string): Promise<ServicesSitter>;
    updateService(id: string, updateServicesSitterInput: UpdateServicesSitterInput): Promise<ServicesSitter>;
    removeService(id: string): Promise<boolean>;
}
