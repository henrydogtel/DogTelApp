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
exports.DogsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const dogs_service_1 = require("./dogs.service");
const dog_entity_1 = require("./entities/dog.entity");
const create_dog_input_1 = require("./dto/create-dog.input");
const update_dog_input_1 = require("./dto/update-dog.input");
const common_1 = require("@nestjs/common");
const remove_dog_input_1 = require("./dto/remove-dog.input");
let DogsResolver = class DogsResolver {
    constructor(dogsService) {
        this.dogsService = dogsService;
    }
    async createDog(idUser, createDogInput) {
        try {
            const { name, birthdate, race, size, images } = createDogInput;
            return await this.dogsService.createDog(idUser, createDogInput);
        }
        catch (error) {
            console.error('Error creating dog:', error);
            throw new Error('An error occurred while creating the dog. Please try again.');
        }
    }
    async findAll(id) {
        try {
            return await this.dogsService.findAll(id);
        }
        catch (error) {
            console.error('Error retrieving dogs:', error);
            throw new Error('An error occurred while retrieving the dogs. Please try again.');
        }
    }
    async findOne(id) {
        try {
            return await this.dogsService.findOne(id);
        }
        catch (error) {
            console.error(`Error finding dog with ID ${id}:`, error);
            throw new Error('An error occurred while finding the dog. Please try again.');
        }
    }
    async updateDog(updateDogInput) {
        try {
            return await this.dogsService.update(updateDogInput.id, updateDogInput);
        }
        catch (error) {
            console.error(`Error updating dog with ID ${updateDogInput.id}:`, error);
            throw new Error('An error occurred while updating the dog. Please try again.');
        }
    }
    async removeDog(id) {
        try {
            const success = await this.dogsService.removeDog(id);
            return {
                success,
                message: success
                    ? 'Dog removed successfully'
                    : 'Failed to remove the dog',
            };
        }
        catch (error) {
            console.error(`Error removing dog with ID ${id}:`, error);
            throw new Error('An error occurred while removing the dog. Please try again.');
        }
    }
    async updateDogImage(id, images) {
        const dogUpdated = await this.dogsService.updateUserImage(id, images);
        return dogUpdated;
    }
};
exports.DogsResolver = DogsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => dog_entity_1.Dog),
    __param(0, (0, graphql_1.Args)('idUser', common_1.ParseUUIDPipe)),
    __param(1, (0, graphql_1.Args)('createDogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_dog_input_1.CreateDogInput]),
    __metadata("design:returntype", Promise)
], DogsResolver.prototype, "createDog", null);
__decorate([
    (0, graphql_1.Query)(() => [dog_entity_1.Dog], { name: 'dogs' }),
    __param(0, (0, graphql_1.Args)('idUser', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DogsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => dog_entity_1.Dog, { name: 'dog' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DogsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => dog_entity_1.Dog),
    __param(0, (0, graphql_1.Args)('updateDogInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dog_input_1.UpdateDogInput]),
    __metadata("design:returntype", Promise)
], DogsResolver.prototype, "updateDog", null);
__decorate([
    (0, graphql_1.Mutation)(() => remove_dog_input_1.RemoveDogResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DogsResolver.prototype, "removeDog", null);
__decorate([
    (0, graphql_1.Mutation)(() => dog_entity_1.Dog),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)({ name: 'images', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], DogsResolver.prototype, "updateDogImage", null);
exports.DogsResolver = DogsResolver = __decorate([
    (0, graphql_1.Resolver)(() => dog_entity_1.Dog),
    __metadata("design:paramtypes", [dogs_service_1.DogsService])
], DogsResolver);
//# sourceMappingURL=dogs.resolver.js.map