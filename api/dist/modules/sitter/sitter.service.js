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
exports.SitterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sitter_entity_1 = require("./entities/sitter.entity");
const typeorm_2 = require("typeorm");
const credentials_repository_1 = require("../credentials/credentials.repository");
const auth_repository_1 = require("../auth/auth.repository");
let SitterService = class SitterService {
    constructor(sitterRepository, credentialRepository, authService) {
        this.sitterRepository = sitterRepository;
        this.credentialRepository = credentialRepository;
        this.authService = authService;
    }
    async create(firstname, lastname, birthdate, address, role, password, email, fee, descripcion) {
        const hashedPassword = await this.authService.hashPassword(password);
        try {
            const credentials = await this.credentialRepository.create({
                password: hashedPassword,
                email,
            });
            if (!credentials)
                throw new common_1.BadRequestException('Hubo un error al crear las credenciales');
            const newSitter = this.sitterRepository.create({
                firstname,
                lastname,
                birthdate,
                address,
                role,
                credentials,
                fee,
                descripcion,
            });
            const sitterSaved = await this.sitterRepository.save(newSitter);
            if (!sitterSaved)
                throw new common_1.BadRequestException('Hubo un error al guardar el sitter');
            return sitterSaved;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error desconocido');
        }
    }
    async findAll() {
        try {
            return await this.sitterRepository.find({
                relations: ['services', 'appointments', 'appointments.user'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener la lista de sitters');
        }
    }
    async findOne(id) {
        try {
            const sitter = await this.sitterRepository.findOne({ where: { id }, relations: ['services', 'appointments', 'appointments.user'] });
            if (!sitter) {
                throw new common_1.NotFoundException(`Sitter con id ${id} no encontrado`);
            }
            return sitter;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Error al obtener el sitter con id ${id}`);
        }
    }
    async findOneByEmail(email) {
        const sitter = await this.sitterRepository.findOne({
            where: { credentials: { email } },
            relations: ['credentials'],
        });
        if (!sitter) {
            throw new common_1.NotFoundException('User not found');
        }
        return sitter;
    }
    async updateUserImage(id, userImg) {
        const user = await this.sitterRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        user.userImg = userImg;
        return this.sitterRepository.save(user);
    }
    async update(id, updateSitterInput) {
        const sitter = await this.sitterRepository.findOne({ where: { id } });
        if (!sitter) {
            throw new common_1.NotFoundException(`Sitter with ID ${id} not found`);
        }
        Object.assign(sitter, updateSitterInput);
        return this.sitterRepository.save(sitter);
    }
    async removeSitter(id) {
        try {
            const sitter = await this.findOne(id);
            if (!sitter) {
                throw new common_1.NotFoundException(`Sitter con ID ${id} no encontrado`);
            }
            await this.sitterRepository.delete(id);
            return true;
        }
        catch (error) {
            console.error('Error al eliminar el sitter:', error);
            return false;
        }
    }
};
exports.SitterService = SitterService;
exports.SitterService = SitterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sitter_entity_1.Sitter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        credentials_repository_1.CredentialsRepository,
        auth_repository_1.AuthRepository])
], SitterService);
//# sourceMappingURL=sitter.service.js.map