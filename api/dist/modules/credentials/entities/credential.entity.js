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
exports.Credentials = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const sitter_entity_1 = require("../../sitter/entities/sitter.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let Credentials = class Credentials {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, password: { required: true, type: () => String, minLength: 8, maxLength: 20 }, passport: { required: false, type: () => String }, email: { required: true, type: () => String }, verified: { required: true, type: () => Boolean }, user: { required: true, type: () => require("../../user/entities/user.entity").User }, sitter: { required: true, type: () => require("../../user/entities/user.entity").User } };
    }
};
exports.Credentials = Credentials;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Credentials.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The password is required' }),
    (0, class_validator_1.IsString)({ message: 'The password must be a string' }),
    (0, class_validator_1.Length)(8, 20, {
        message: 'The password must be between 8 and 20 characters long',
    }),
    __metadata("design:type", String)
], Credentials.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsString)({ message: 'The passport number must be a string' }),
    __metadata("design:type", String)
], Credentials.prototype, "passport", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The email is required' }),
    (0, class_validator_1.IsEmail)({}, { message: 'A valid email is required' }),
    __metadata("design:type", String)
], Credentials.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)({ default: false }),
    (0, class_validator_1.IsBoolean)({ message: 'The verification field must be boolean' }),
    __metadata("design:type", Boolean)
], Credentials.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.credentials),
    __metadata("design:type", user_entity_1.User)
], Credentials.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => sitter_entity_1.Sitter),
    (0, typeorm_1.OneToOne)(() => sitter_entity_1.Sitter, (sitter) => sitter.credentials),
    __metadata("design:type", user_entity_1.User)
], Credentials.prototype, "sitter", void 0);
exports.Credentials = Credentials = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Credentials);
//# sourceMappingURL=credential.entity.js.map