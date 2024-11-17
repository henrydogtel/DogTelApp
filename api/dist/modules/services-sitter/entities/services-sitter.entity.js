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
exports.ServicesSitter = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const sitter_entity_1 = require("../../sitter/entities/sitter.entity");
const typeorm_1 = require("typeorm");
let ServicesSitter = class ServicesSitter {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, minLength: 1, maxLength: 50 }, description: { required: true, type: () => String }, sitter: { required: true, type: () => require("../../sitter/entities/sitter.entity").Sitter } };
    }
};
exports.ServicesSitter = ServicesSitter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    (0, class_validator_1.IsUUID)('4', { message: 'The ID must be a valid UUID' }),
    __metadata("design:type", String)
], ServicesSitter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The name is required' }),
    (0, class_validator_1.IsString)({ message: 'The name must be a string' }),
    (0, class_validator_1.Length)(1, 50, { message: 'The name must be between 1 and 50 characters' }),
    __metadata("design:type", String)
], ServicesSitter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, graphql_1.Field)({ nullable: false }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The description is required' }),
    (0, class_validator_1.IsString)({ message: 'The description must be a string' }),
    __metadata("design:type", String)
], ServicesSitter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sitter_entity_1.Sitter, (sitter) => sitter.services),
    (0, typeorm_1.JoinColumn)({ name: 'sitter_id' }),
    (0, graphql_1.Field)(() => sitter_entity_1.Sitter),
    __metadata("design:type", sitter_entity_1.Sitter)
], ServicesSitter.prototype, "sitter", void 0);
exports.ServicesSitter = ServicesSitter = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], ServicesSitter);
//# sourceMappingURL=services-sitter.entity.js.map