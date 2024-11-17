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
exports.ServicesSitterResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const services_sitter_service_1 = require("./services-sitter.service");
const services_sitter_entity_1 = require("./entities/services-sitter.entity");
const create_services_sitter_input_1 = require("./dto/create-services-sitter.input");
const update_services_sitter_input_1 = require("./dto/update-services-sitter.input");
const remove_services_sitter_1 = require("./dto/remove-services-sitter");
let ServicesSitterResolver = class ServicesSitterResolver {
    constructor(servicesSitterService) {
        this.servicesSitterService = servicesSitterService;
    }
    async createServicesSitter(idSitter, createServicesSitterInput) {
        try {
            const { name, description } = createServicesSitterInput;
            return await this.servicesSitterService.create(idSitter, createServicesSitterInput);
        }
        catch (error) {
            console.error('Error creating services sitter:', error);
            throw new Error('An error occurred while creating the services sitter. Please try again.');
        }
    }
    async findAll() {
        try {
            return await this.servicesSitterService.findAll();
        }
        catch (error) {
            console.error('Error retrieving services sitters:', error);
            throw new Error('An error occurred while retrieving the services sitters. Please try again.');
        }
    }
    async findOne(id) {
        try {
            return await this.servicesSitterService.findOne(id);
        }
        catch (error) {
            console.error(`Error finding service sitter with ID ${id}:`, error);
            throw new Error('An error occurred while finding the services sitter. Please try again.');
        }
    }
    async updateServicesSitter(updateServicesSitterInput) {
        try {
            return await this.servicesSitterService.update(updateServicesSitterInput.id, updateServicesSitterInput);
        }
        catch (error) {
            console.error(`Error updating services sitter with ID ${updateServicesSitterInput.id}:`, error);
            throw new Error('An error occurred while updating the services sitter. Please try again.');
        }
    }
    async removeServicesSitter(id) {
        try {
            const success = await this.servicesSitterService.removeService(id);
            return {
                success,
                message: success
                    ? 'The service was deleted successfully'
                    : 'Error deleting the service',
            };
        }
        catch (error) {
            console.error(`Error removing service sitter with ID ${id}:`, error);
            throw new Error('An error occurred while deleting the services sitter. Please try again.');
        }
    }
};
exports.ServicesSitterResolver = ServicesSitterResolver;
__decorate([
    (0, graphql_1.Mutation)(() => services_sitter_entity_1.ServicesSitter),
    __param(0, (0, graphql_1.Args)('sitter_id')),
    __param(1, (0, graphql_1.Args)('CreateServicesSitterInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_services_sitter_input_1.CreateServicesSitterInput]),
    __metadata("design:returntype", Promise)
], ServicesSitterResolver.prototype, "createServicesSitter", null);
__decorate([
    (0, graphql_1.Query)(() => [services_sitter_entity_1.ServicesSitter], { name: 'servicesSitter' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesSitterResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => services_sitter_entity_1.ServicesSitter, { name: 'servicesSitter' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesSitterResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => services_sitter_entity_1.ServicesSitter),
    __param(0, (0, graphql_1.Args)('updateServicesSitterInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_services_sitter_input_1.UpdateServicesSitterInput]),
    __metadata("design:returntype", Promise)
], ServicesSitterResolver.prototype, "updateServicesSitter", null);
__decorate([
    (0, graphql_1.Mutation)(() => remove_services_sitter_1.RemoveServicesSitter),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesSitterResolver.prototype, "removeServicesSitter", null);
exports.ServicesSitterResolver = ServicesSitterResolver = __decorate([
    (0, graphql_1.Resolver)(() => services_sitter_entity_1.ServicesSitter),
    __metadata("design:paramtypes", [services_sitter_service_1.ServicesSitterService])
], ServicesSitterResolver);
//# sourceMappingURL=services-sitter.resolver.js.map