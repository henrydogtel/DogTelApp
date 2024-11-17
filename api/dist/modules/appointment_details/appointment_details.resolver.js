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
exports.AppointmentDetailsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const appointment_details_service_1 = require("./appointment_details.service");
const appointment_detail_entity_1 = require("./entities/appointment_detail.entity");
const create_appointment_detail_input_1 = require("./dto/create-appointment_detail.input");
const update_appointment_detail_input_1 = require("./dto/update-appointment_detail.input");
let AppointmentDetailsResolver = class AppointmentDetailsResolver {
    constructor(appointmentDetailsService) {
        this.appointmentDetailsService = appointmentDetailsService;
    }
    async createAppointmentDetail(createAppointmentDetailInput) {
        try {
            return await this.appointmentDetailsService.create(createAppointmentDetailInput);
        }
        catch (error) {
            console.error('Error creating appointment detail:', error);
            throw new Error('An error occurred while creating the appointment detail. Please try again.');
        }
    }
    async findAll() {
        try {
            return await this.appointmentDetailsService.findAll();
        }
        catch (error) {
            console.error('Error retrieving appointment details:', error);
            throw new Error('An error occurred while retrieving appointment details. Please try again.');
        }
    }
    async findOne(id) {
        try {
            return await this.appointmentDetailsService.findOne(id);
        }
        catch (error) {
            console.error(`Error finding appointment detail with ID ${id}:`, error);
            throw new Error('An error occurred while finding the appointment detail. Please try again.');
        }
    }
    async updateAppointmentDetail(updateAppointmentDetailInput) {
        try {
            return await this.appointmentDetailsService.update(updateAppointmentDetailInput.id, updateAppointmentDetailInput);
        }
        catch (error) {
            console.error(`Error updating appointment detail with ID ${updateAppointmentDetailInput.id}:`, error);
            throw new Error('An error occurred while updating the appointment detail. Please try again.');
        }
    }
    async removeAppointmentDetail(id) {
        try {
            return await this.appointmentDetailsService.remove(id);
        }
        catch (error) {
            console.error(`Error removing appointment detail with ID ${id}:`, error);
            throw new Error('An error occurred while removing the appointment detail. Please try again.');
        }
    }
};
exports.AppointmentDetailsResolver = AppointmentDetailsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => appointment_detail_entity_1.AppointmentDetail),
    __param(0, (0, graphql_1.Args)('createAppointmentDetailInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_detail_input_1.CreateAppointmentDetailInput]),
    __metadata("design:returntype", Promise)
], AppointmentDetailsResolver.prototype, "createAppointmentDetail", null);
__decorate([
    (0, graphql_1.Query)(() => [appointment_detail_entity_1.AppointmentDetail], { name: 'appointmentDetails' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppointmentDetailsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => appointment_detail_entity_1.AppointmentDetail, { name: 'appointmentDetail' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentDetailsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_detail_entity_1.AppointmentDetail),
    __param(0, (0, graphql_1.Args)('updateAppointmentDetailInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_appointment_detail_input_1.UpdateAppointmentDetailInput]),
    __metadata("design:returntype", Promise)
], AppointmentDetailsResolver.prototype, "updateAppointmentDetail", null);
__decorate([
    (0, graphql_1.Mutation)(() => appointment_detail_entity_1.AppointmentDetail),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppointmentDetailsResolver.prototype, "removeAppointmentDetail", null);
exports.AppointmentDetailsResolver = AppointmentDetailsResolver = __decorate([
    (0, graphql_1.Resolver)(() => appointment_detail_entity_1.AppointmentDetail),
    __metadata("design:paramtypes", [appointment_details_service_1.AppointmentDetailsService])
], AppointmentDetailsResolver);
//# sourceMappingURL=appointment_details.resolver.js.map