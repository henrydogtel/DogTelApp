import { ServicesSitterService } from './services-sitter.service';
import { ServicesSitter } from './entities/services-sitter.entity';
import { CreateServicesSitterInput } from './dto/create-services-sitter.input';
import { UpdateServicesSitterInput } from './dto/update-services-sitter.input';
import { RemoveServicesSitter } from './dto/remove-services-sitter';
export declare class ServicesSitterResolver {
    private readonly servicesSitterService;
    constructor(servicesSitterService: ServicesSitterService);
    createServicesSitter(idSitter: string, createServicesSitterInput: CreateServicesSitterInput): Promise<ServicesSitter>;
    findAll(): Promise<ServicesSitter[]>;
    findOne(id: string): Promise<ServicesSitter>;
    updateServicesSitter(updateServicesSitterInput: UpdateServicesSitterInput): Promise<ServicesSitter>;
    removeServicesSitter(id: string): Promise<RemoveServicesSitter>;
}
