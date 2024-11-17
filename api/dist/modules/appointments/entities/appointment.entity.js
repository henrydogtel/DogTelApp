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
exports.Appointment = exports.typeStatus = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const appointment_detail_entity_1 = require("../../appointment_details/entities/appointment_detail.entity");
const sitter_entity_1 = require("../../sitter/entities/sitter.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
var typeStatus;
(function (typeStatus) {
    typeStatus["PENDING"] = "pending";
    typeStatus["CANCELLED"] = "canceled";
    typeStatus["APPROVED"] = "approved";
    typeStatus["FINISHED"] = "finished";
})(typeStatus || (exports.typeStatus = typeStatus = {}));
(0, graphql_1.registerEnumType)(typeStatus, {
    name: 'typeStatus',
    description: 'Supported appointment statuses.',
});
let Appointment = class Appointment {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, entryDate: { required: false, type: () => Date }, departureDate: { required: false, type: () => Date }, timeIn: { required: false, type: () => Date }, timeOut: { required: false, type: () => Date }, status: { required: false, enum: require("./appointment.entity").typeStatus }, total: { required: false, type: () => Number }, note: { required: false, type: () => String }, sitter: { required: true, type: () => require("../../sitter/entities/sitter.entity").Sitter }, user: { required: true, type: () => require("../../user/entities/user.entity").User }, detail: { required: true, type: () => [require("../../appointment_details/entities/appointment_detail.entity").AppointmentDetail] }, createdAt: { required: true, type: () => Date } };
    }
};
exports.Appointment = Appointment;
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Unique ID for each appointment' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'Start date of the appointment',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ name: 'entry_date', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'The start date must be a valid date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "entryDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'End date of the appointment',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ name: 'departure_date', nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'The end date must be a valid date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "departureDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'Time of the appointment', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'The appointment time must be a valid date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "timeIn", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'Time of the appointment', nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'The appointment time must be a valid date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "timeOut", void 0);
__decorate([
    (0, graphql_1.Field)(() => typeStatus, {
        description: 'Status of the appointment',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ default: typeStatus.PENDING, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(typeStatus, {
        message: 'The status must be one of the allowed values',
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        description: 'Total cost of the appointment',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'The total must be a valid number' }),
    __metadata("design:type", Number)
], Appointment.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Customer note about the appointment',
        nullable: true,
    }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'The note cannot be empty' }),
    __metadata("design:type", String)
], Appointment.prototype, "note", void 0);
__decorate([
    (0, graphql_1.Field)(() => sitter_entity_1.Sitter),
    (0, typeorm_1.ManyToOne)(() => sitter_entity_1.Sitter, (sitter) => sitter.appointments),
    (0, typeorm_1.JoinColumn)({ name: 'sitter' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The sitter cannot be empty' }),
    __metadata("design:type", sitter_entity_1.Sitter)
], Appointment.prototype, "sitter", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.appointments),
    (0, class_validator_1.IsNotEmpty)({ message: 'The user cannot be empty' }),
    (0, typeorm_1.JoinColumn)({ name: 'user' }),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => [appointment_detail_entity_1.AppointmentDetail]),
    (0, typeorm_1.OneToMany)(() => appointment_detail_entity_1.AppointmentDetail, (detail) => detail.appointment),
    __metadata("design:type", Array)
], Appointment.prototype, "detail", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { description: 'hour when appointment create was' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)({ name: 'appointments' }),
    (0, graphql_1.ObjectType)()
], Appointment);
//# sourceMappingURL=appointment.entity.js.map