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
exports.Calification = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const sitter_entity_1 = require("../../sitter/entities/sitter.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Calification = class Calification {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, rate: { required: true, type: () => Number, minimum: 1, maximum: 5 }, userId: { required: true, type: () => String }, sitterId: { required: true, type: () => String }, comment: { required: false, type: () => String }, user: { required: true, type: () => require("../../user/entities/user.entity").User }, sitter: { required: true, type: () => require("../../sitter/entities/sitter.entity").Sitter } };
    }
};
exports.Calification = Calification;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Calification.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The rating is required' }),
    (0, class_validator_1.IsInt)({ message: 'The rating must be an integer' }),
    (0, class_validator_1.Min)(1, { message: 'The rating must be at least 1' }),
    (0, class_validator_1.Max)(5, { message: 'The rating cannot exceed 5' }),
    __metadata("design:type", Number)
], Calification.prototype, "rate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The user ID is required' }),
    (0, class_validator_1.IsUUID)('4', { message: 'The user ID must be a valid UUID' }),
    __metadata("design:type", String)
], Calification.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The sitter ID is required' }),
    (0, class_validator_1.IsUUID)('4', { message: 'The sitter ID must be a valid UUID' }),
    __metadata("design:type", String)
], Calification.prototype, "sitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'The comment must be a string' }),
    __metadata("design:type", String)
], Calification.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.califications, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], Calification.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sitter_entity_1.Sitter, (sitter) => sitter.califications, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", sitter_entity_1.Sitter)
], Calification.prototype, "sitter", void 0);
exports.Calification = Calification = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('califications')
], Calification);
//# sourceMappingURL=calification.entity.js.map