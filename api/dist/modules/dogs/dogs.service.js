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
exports.DogsService = void 0;
const common_1 = require("@nestjs/common");
const dogs_repository_1 = require("./dogs.repository");
const dog_entity_1 = require("./entities/dog.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let DogsService = class DogsService {
    constructor(dogRepository, dogsRepository) {
        this.dogRepository = dogRepository;
        this.dogsRepository = dogsRepository;
    }
    async createDog(idUser, createDogInput) {
        try {
            return await this.dogsRepository.createDog(idUser, createDogInput);
        }
        catch (error) {
            throw error;
        }
    }
    findAll(idUser) {
        return this.dogsRepository.findAll(idUser);
    }
    findOne(id) {
        return this.dogsRepository.findOne(id);
    }
    async update(id, updateDogInput) {
        return await this.dogsRepository.updateDog(id, updateDogInput);
    }
    async removeDog(id) {
        try {
            const dog = await this.findOne(id);
            await this.dogsRepository.removeDog(id);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    async updateUserImage(id, images) {
        const dog = await this.dogRepository.findOne({ where: { id } });
        if (!dog) {
            throw new Error('Dog not found');
        }
        dog.images = images;
        return this.dogRepository.save(dog);
    }
};
exports.DogsService = DogsService;
exports.DogsService = DogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(dog_entity_1.Dog)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        dogs_repository_1.DogsRepository])
], DogsService);
//# sourceMappingURL=dogs.service.js.map