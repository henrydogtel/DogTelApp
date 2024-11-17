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
exports.AppointmentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const appointments_service_1 = require("../service/appointments.service");
const appointment_entity_1 = require("../entities/appointment.entity");
const create_appointment_input_1 = require("../dto/create-appointment.input");
const update_appointment_input_1 = require("../dto/update-appointment.input");
const common_1 = require("@nestjs/common");
let AppointmentsResolver = class AppointmentsResolver {
    constructor(appointmentsService) {
        this.appointmentsService = appointmentsService;
    }
    async createAppointment(createAppointment) {
        try {
            console.log(createAppointment);
            return await this.appointmentsService.create(createAppointment);
        }
        catch (error) {
            console.error('Error creating appointment:', error);
            throw error.message;
        }
    }
    async findAll() {
        try {
            return await this.appointmentsService.findAll();
        }
        catch (error) {
            console.error('Error retrieving appointments:', error);
            throw new Error('An error occurred while retrieving appointments. Please try again.');
        }
    }
    async findOne(id) {
        try {
            return await this.appointmentsService.findOne(id);
        }
        catch (error) {
            console.error(`Error finding appointment with ID ${id}:`, error);
            throw new Error('An error occurred while finding the appointment. Please try again.');
        }
    }
    async updateAppointment(updateAppointmentInput) {
        try {
            return await this.appointmentsService.update(updateAppointmentInput.id, updateAppointmentInput);
        }
        catch (error) {
            console.error(`Error updating appointment with ID ${updateAppointmentInput.id}:`, error);
            throw new Error('An error occurred while updating the appointment. Please try again.');
        }
    }
    async removeAppointment(id) {
        try {
            return await this.appointmentsService.remove(id);
        }
        catch (error) {
            console.error(`Error removing appointment with ID ${id}:`, error);
            throw new Error('An error occurred while removing the appointment. Please try again.');
        }
    }
    async getAppointmentsByIdUser(idUser) {
        try {
            const appointments = await this.appointmentsService.getAppointmentsByIdUser(idUser);
            if (!appointments)
                throw new common_1.BadRequestException('Hubo un error al obtener los appointments');
            return appointments;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAppointmentsByIdSitter(idSitter) {
        try {
            const appointments = await this.appointmentsService.getAppointmentsByIdSitter(idSitter);
            if (!appointments)
                throw new common_1.BadRequestException('Hubo un error al obtener los appointments');
            return appointments;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async confirmAppointment(idAppointment) {
        try {
            const response = await this.appointmentsService.confirmAppointment(idAppointment);
            if (!response)
                throw new common_1.BadRequestException('Hubo un error al aceptar el appointment');
            return { message: 'appointment approved', status: true };
        }
        catch (error) {
            throw error;
        }
    }
    async rejectAppointment(idAppointment) {
        try {
            const response = await this.appointmentsService.cancelAppointment(idAppointment);
            if (!response)
                throw new common_1.BadRequestException('Hubo un error al cancelar el appointment');
            return { message: 'appointment cancelled', status: true };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AppointmentsResolver = AppointmentsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => appointment_entity_1.Appointment),
    __param(0, (0, graphql_1.Args)('createAppointment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_input_1.CreateAppointmentInput]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "createAppointment", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_entity_1.Appointment], { name: 'appointments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => appointment_entity_1.Appointment, { name: 'appointment' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_entity_1.Appointment),
    __param(0, (0, graphql_1.Args)('updateAppointmentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_appointment_input_1.UpdateAppointmentInput]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "updateAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_entity_1.Appointment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "removeAppointment", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_entity_1.Appointment]),
    __param(0, (0, graphql_1.Args)('idUser', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "getAppointmentsByIdUser", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_entity_1.Appointment]),
    __param(0, (0, graphql_1.Args)('idSitter', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "getAppointmentsByIdSitter", null);
__decorate([
    (0, graphql_1.Mutation)(() => update_appointment_input_1.ResponseAprobarAppointment),
    __param(0, (0, graphql_1.Args)('idAppointment', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "confirmAppointment", null);
__decorate([
    (0, graphql_1.Mutation)(() => update_appointment_input_1.ResponseAprobarAppointment),
    __param(0, (0, graphql_1.Args)('idAppointment', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentsResolver.prototype, "rejectAppointment", null);
exports.AppointmentsResolver = AppointmentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => appointment_entity_1.Appointment),
    __metadata("design:paramtypes", [appointments_service_1.AppointmentsService])
], AppointmentsResolver);
//# sourceMappingURL=appointments.resolver.js.map