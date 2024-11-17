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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesSitterService = void 0;
const common_1 = require("@nestjs/common");
const sitter_repository_1 = require("./sitter-repository");
let ServicesSitterService = class ServicesSitterService {
    constructor(sitterServiceRepository) {
        this.sitterServiceRepository = sitterServiceRepository;
    }
    async create(sitter_id, createServicesSitterInput) {
        try {
            return await this.sitterServiceRepository.createService(sitter_id, createServicesSitterInput);
        }
        catch (error) {
            throw error;
        }
    }
    findAll() {
        return this.sitterServiceRepository.findAll();
    }
    findOne(id) {
        return this.sitterServiceRepository.findOne(id);
    }
    async update(id, updateServicesSitterInput) {
        return await this.sitterServiceRepository.updateService(id, updateServicesSitterInput);
    }
    async removeService(id) {
        try {
            const service = await this.sitterServiceRepository.findOne(id);
            await this.sitterServiceRepository.removeService(id);
            return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.ServicesSitterService = ServicesSitterService;
exports.ServicesSitterService = ServicesSitterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sitter_repository_1.SitterServiceRepository])
], ServicesSitterService);
//# sourceMappingURL=services-sitter.service.js.map