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
exports.Sitter = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const services_sitter_entity_1 = require("../../services-sitter/entities/services-sitter.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const person_entity_1 = require("../../../global-entities/person.entity");
const credential_entity_1 = require("../../credentials/entities/credential.entity");
const calification_entity_1 = require("../../califications/entities/calification.entity");
const class_validator_1 = require("class-validator");
let Sitter = class Sitter extends person_entity_1.Person {
    static _OPENAPI_METADATA_FACTORY() {
        return { rate: { required: true, type: () => Number, minimum: 0 }, fee: { required: true, type: () => Number, minimum: 0 }, descripcion: { required: true, type: () => String, minLength: 1, maxLength: 255 }, services: { required: true, type: () => [require("../../services-sitter/entities/services-sitter.entity").ServicesSitter] }, appointments: { required: true, type: () => [require("../../appointments/entities/appointment.entity").Appointment] }, credentials: { required: true, type: () => require("../../credentials/entities/credential.entity").Credentials }, califications: { required: true, type: () => [require("../../califications/entities/calification.entity").Calification] } };
    }
};
exports.Sitter = Sitter;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'float', default: 0.0 }),
    (0, class_validator_1.IsInt)({ message: 'Rate must be an integer' }),
    (0, class_validator_1.Min)(0, { message: 'Rate must be zero or greater' }),
    __metadata("design:type", Number)
], Sitter.prototype, "rate", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, class_validator_1.IsInt)({ message: 'Fee must be an integer' }),
    (0, class_validator_1.Min)(0, { message: 'Fee must be zero or greater' }),
    __metadata("design:type", Number)
], Sitter.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.Length)(1, 255, {
        message: 'Description must be between 1 and 255 characters',
    }),
    __metadata("design:type", String)
], Sitter.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => services_sitter_entity_1.ServicesSitter, (services) => services.sitter),
    (0, graphql_1.Field)(() => [services_sitter_entity_1.ServicesSitter]),
    __metadata("design:type", Array)
], Sitter.prototype, "services", void 0);
__decorate([
    (0, graphql_1.Field)(() => [appointment_entity_1.Appointment]),
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, (appointment) => appointment.sitter),
    __metadata("design:type", Array)
], Sitter.prototype, "appointments", void 0);
__decorate([
    (0, graphql_1.Field)(() => credential_entity_1.Credentials),
    (0, typeorm_1.OneToOne)(() => credential_entity_1.Credentials, (credentials) => credentials.sitter),
    (0, typeorm_1.JoinColumn)({ name: 'credentials_id' }),
    __metadata("design:type", credential_entity_1.Credentials)
], Sitter.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => calification_entity_1.Calification, (calification) => calification.sitter),
    __metadata("design:type", Array)
], Sitter.prototype, "califications", void 0);
exports.Sitter = Sitter = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Sitter);
//# sourceMappingURL=sitter.entity.js.map