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
exports.AppointmentDetail = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const dog_entity_1 = require("../../dogs/entities/dog.entity");
const typeorm_1 = require("typeorm");
let AppointmentDetail = class AppointmentDetail {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Object }, price: { required: true, type: () => Number, minimum: 1 }, dog: { required: true, type: () => require("../../dogs/entities/dog.entity").Dog }, appointment: { required: true, type: () => require("../../appointments/entities/appointment.entity").Appointment } };
    }
};
exports.AppointmentDetail = AppointmentDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String, { description: 'Unique ID for the appointment detail' }),
    __metadata("design:type", String)
], AppointmentDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price', type: 'decimal' }),
    (0, graphql_1.Field)(() => Number, { description: 'Unit price per dog' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Price cannot be empty' }),
    (0, class_validator_1.IsPositive)({ message: 'Price must be a positive number' }),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => dog_entity_1.Dog, (dog) => dog.details),
    (0, graphql_1.Field)(() => dog_entity_1.Dog),
    (0, typeorm_1.JoinColumn)({ name: 'dog' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'This field cannot be empty' }),
    __metadata("design:type", dog_entity_1.Dog)
], AppointmentDetail.prototype, "dog", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => appointment_entity_1.Appointment, (appointment) => appointment.detail),
    (0, graphql_1.Field)(() => appointment_entity_1.Appointment),
    (0, typeorm_1.JoinColumn)({ name: 'appointment' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The appointment cannot be empty' }),
    __metadata("design:type", appointment_entity_1.Appointment)
], AppointmentDetail.prototype, "appointment", void 0);
exports.AppointmentDetail = AppointmentDetail = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'appointment-detail' })
], AppointmentDetail);
//# sourceMappingURL=appointment_detail.entity.js.map