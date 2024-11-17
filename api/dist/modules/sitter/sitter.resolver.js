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
exports.SitterResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const sitter_service_1 = require("./sitter.service");
const sitter_entity_1 = require("./entities/sitter.entity");
const update_sitter_input_1 = require("./dto/update-sitter.input");
const common_1 = require("@nestjs/common");
const user_role_enum_1 = require("../../enums/user-role.enum");
const remove_siterr_input_1 = require("./dto/remove-siterr.input");
let SitterResolver = class SitterResolver {
    constructor(sitterService) {
        this.sitterService = sitterService;
    }
    async createSitter(firstname, lastname, birthdate, address, role, password, email, fee, descripcion) {
        try {
            const sitter = await this.sitterService.create(firstname, lastname, birthdate, address, role, password, email, fee, descripcion);
            return sitter;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Error al crear el sitter');
        }
    }
    async findAll() {
        try {
            return await this.sitterService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException('Error al obtener la lista de sitters');
        }
    }
    async findOne(id) {
        try {
            return await this.sitterService.findOne(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al obtener el sitter con id: ${id}`);
        }
    }
    async findOneByEmail(email) {
        return this.sitterService.findOneByEmail(email);
    }
    async updateSitter(id, updateSitterInput) {
        return await this.sitterService.update(id, updateSitterInput);
    }
    async updateSitterImage(id, userImg) {
        const userUpdated = await this.sitterService.updateUserImage(id, userImg);
        return userUpdated;
    }
    async removeSitter(id) {
        const success = await this.sitterService.removeSitter(id);
        return {
            success,
            message: success ? 'Mascota eliminada con éxito' : 'Error al eliminar la mascota',
        };
    }
};
exports.SitterResolver = SitterResolver;
__decorate([
    (0, graphql_1.Mutation)(() => sitter_entity_1.Sitter),
    __param(0, (0, graphql_1.Args)('firstname')),
    __param(1, (0, graphql_1.Args)('lastname')),
    __param(2, (0, graphql_1.Args)('birthdate')),
    __param(3, (0, graphql_1.Args)('address')),
    __param(4, (0, graphql_1.Args)('role')),
    __param(5, (0, graphql_1.Args)('password')),
    __param(6, (0, graphql_1.Args)('email')),
    __param(7, (0, graphql_1.Args)('fee')),
    __param(8, (0, graphql_1.Args)('descripcion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date, String, String, String, String, Number, String]),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "createSitter", null);
__decorate([
    (0, graphql_1.Query)(() => [sitter_entity_1.Sitter], { name: 'sitters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => sitter_entity_1.Sitter, { name: 'sitter' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => sitter_entity_1.Sitter, { name: 'sitterByEmail' }),
    __param(0, (0, graphql_1.Args)('email', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "findOneByEmail", null);
__decorate([
    (0, graphql_1.Mutation)(() => sitter_entity_1.Sitter),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __param(1, (0, graphql_1.Args)('updateSitterInput', { type: () => update_sitter_input_1.UpdateSitterInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "updateSitter", null);
__decorate([
    (0, graphql_1.Mutation)(() => sitter_entity_1.Sitter),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('userImg')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "updateSitterImage", null);
__decorate([
    (0, graphql_1.Mutation)(() => remove_siterr_input_1.RemoveSitterResponse),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitterResolver.prototype, "removeSitter", null);
exports.SitterResolver = SitterResolver = __decorate([
    (0, graphql_1.Resolver)(() => sitter_entity_1.Sitter),
    __metadata("design:paramtypes", [sitter_service_1.SitterService])
], SitterResolver);
//# sourceMappingURL=sitter.resolver.js.map