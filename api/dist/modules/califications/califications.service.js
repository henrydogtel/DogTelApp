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
exports.CalificationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const calification_entity_1 = require("./entities/calification.entity");
const sitter_entity_1 = require("../sitter/entities/sitter.entity");
let CalificationsService = class CalificationsService {
    constructor(calificationsRepository, sittersRepository) {
        this.calificationsRepository = calificationsRepository;
        this.sittersRepository = sittersRepository;
    }
    async createCalification(createCalificationDto) {
        const { sitterId, userId, rate, comment } = createCalificationDto;
        const calification = this.calificationsRepository.create({
            sitter: { id: sitterId },
            user: { id: userId },
            rate,
            comment,
        });
        await this.calificationsRepository.save(calification);
        await this.updateSitterRate(sitterId);
        return calification;
    }
    async updateSitterRate(sitterId) {
        const sitter = await this.sittersRepository.findOne({
            where: { id: sitterId },
            relations: ['califications'],
        });
        if (!sitter) {
            throw new common_1.NotFoundException(`Sitter with ID ${sitterId} not found`);
        }
        const totalScore = sitter.califications.reduce((sum, calification) => sum + calification.rate, 0);
        const rate = totalScore / sitter.califications.length;
        sitter.rate = rate;
        await this.sittersRepository.save(sitter);
    }
};
exports.CalificationsService = CalificationsService;
exports.CalificationsService = CalificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calification_entity_1.Calification)),
    __param(1, (0, typeorm_1.InjectRepository)(sitter_entity_1.Sitter)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CalificationsService);
//# sourceMappingURL=califications.service.js.map