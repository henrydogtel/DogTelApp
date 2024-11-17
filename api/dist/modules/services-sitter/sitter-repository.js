"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitterServiceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const services_sitter_entity_1 = require("./entities/services-sitter.entity");
let SitterServiceRepository = class SitterServiceRepository {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async createService(sitter_id, createServicesSitterInput) {
        const { name, description } = createServicesSitterInput;
        try {
            const serviceCreated = this.serviceRepository.create({
                name,
                description,
            });
            if (!serviceCreated)
                throw new common_1.BadRequestException('Error at create service');
            const serviceSaved = await this.serviceRepository.save(serviceCreated);
            return serviceCreated;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const services = await this.serviceRepository.find();
            if (!services.length)
                throw new common_1.NotFoundException('Services not found');
            return services;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const serviceById = await this.serviceRepository.findOne({
                where: { id },
            });
            if (!serviceById)
                throw new common_1.NotFoundException('the service was not found');
            return serviceById;
        }
        catch (error) {
            throw error;
        }
    }
    async updateService(id, updateServicesSitterInput) {
        try {
            const service = await this.findOne(id);
            if (!service)
                throw new common_1.NotFoundException('The service was not found');
            await this.serviceRepository.update(id, updateServicesSitterInput);
            return await this.findOne(id);
        }
        catch (error) {
            throw error;
        }
    }
    async removeService(id) {
        try {
            const service = await this.findOne(id);
            if (!service) {
                throw new common_1.NotFoundException('The service to remove it could not be found');
            }
            await this.serviceRepository.remove(service);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
};
exports.SitterServiceRepository = SitterServiceRepository;
exports.SitterServiceRepository = SitterServiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(services_sitter_entity_1.ServicesSitter)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SitterServiceRepository);
//# sourceMappingURL=sitter-repository.js.map