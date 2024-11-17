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
exports.CreateAppointmentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateAppointmentInput = class CreateAppointmentInput {
};
exports.CreateAppointmentInput = CreateAppointmentInput;
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Fecha de inicio de la cita',
        nullable: true,
    }),
    __metadata("design:type", Date)
], CreateAppointmentInput.prototype, "entryDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Fecha de finalización de la cita',
        nullable: true,
    }),
    __metadata("design:type", Date)
], CreateAppointmentInput.prototype, "departureDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Hora de la cita', nullable: true }),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "timeIn", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Hora del final de la cita',
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "timeOut", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Nota del cliente sobre la cita',
        nullable: true,
    }),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "note", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'id del usuario de la cita' }),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "idUser", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'id del sitter a cuidar en la cita' }),
    __metadata("design:type", String)
], CreateAppointmentInput.prototype, "idSitter", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { description: 'id dogs to appointment' }),
    __metadata("design:type", Array)
], CreateAppointmentInput.prototype, "dogsId", void 0);
exports.CreateAppointmentInput = CreateAppointmentInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAppointmentInput);
//# sourceMappingURL=create-appointment.input.js.map