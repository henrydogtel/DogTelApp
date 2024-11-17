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
exports.DogsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dog_entity_1 = require("./entities/dog.entity");
const typeorm_2 = require("typeorm");
const user_repository_1 = require("../user/user.repository");
let DogsRepository = class DogsRepository {
    constructor(dogsRepository, userRepository) {
        this.dogsRepository = dogsRepository;
        this.userRepository = userRepository;
    }
    async createDog(idUser, createDogInput) {
        const { name, birthdate, race, size, images } = createDogInput;
        try {
            const userFound = await this.userRepository.findOne(idUser);
            if (!userFound)
                throw new common_1.BadRequestException('No se encontro el usuario');
            const dogCreated = this.dogsRepository.create({
                name,
                birthdate,
                race,
                size,
                images,
                user: userFound,
            });
            if (!dogCreated)
                throw new common_1.BadRequestException('Hubo un error al crear la mascota');
            const dogSaved = await this.dogsRepository.save(dogCreated);
            if (!dogSaved)
                throw new common_1.BadRequestException('Hubo un error al guardar la mascota');
            return dogSaved;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(idUser) {
        try {
            const dogs = await this.dogsRepository.find({
                where: {
                    user: {
                        id: idUser,
                    },
                },
            });
            if (!dogs.length)
                throw new common_1.NotFoundException('No se encontraron mascotas');
            return dogs;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const dog = await this.dogsRepository.findOne({ where: { id } });
            if (!dog)
                throw new common_1.NotFoundException('Mascota no encontrada');
            return dog;
        }
        catch (error) {
            throw error;
        }
    }
    async updateDog(id, updateDogInput) {
        try {
            const dog = await this.findOne(id);
            if (!dog)
                throw new common_1.NotFoundException('Mascota no encontrada para actualizar');
            await this.dogsRepository.update(id, updateDogInput);
            return await this.findOne(id);
        }
        catch (error) {
            throw error;
        }
    }
    async removeDog(id) {
        try {
            const dog = await this.findOne(id);
            if (!dog) {
                throw new common_1.NotFoundException('Mascota no encontrada para eliminar');
            }
            await this.dogsRepository.remove(dog);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
};
exports.DogsRepository = DogsRepository;
exports.DogsRepository = DogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dog_entity_1.Dog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_repository_1.UserRepository])
], DogsRepository);
//# sourceMappingURL=dogs.repository.js.map