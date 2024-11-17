"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = void 0;
const common_1 = require("@nestjs/common");
const appointments_service_1 = require("./service/appointments.service");
const appointments_resolver_1 = require("./resolver/appointments.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const sitter_entity_1 = require("../sitter/entities/sitter.entity");
const user_entity_1 = require("../user/entities/user.entity");
const dog_entity_1 = require("../dogs/entities/dog.entity");
const appointment_detail_entity_1 = require("../appointment_details/entities/appointment_detail.entity");
let AppointmentsModule = class AppointmentsModule {
};
exports.AppointmentsModule = AppointmentsModule;
exports.AppointmentsModule = AppointmentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.Appointment, sitter_entity_1.Sitter, user_entity_1.User, dog_entity_1.Dog, appointment_detail_entity_1.AppointmentDetail])],
        providers: [appointments_resolver_1.AppointmentsResolver, appointments_service_1.AppointmentsService],
    })
], AppointmentsModule);
//# sourceMappingURL=appointments.module.js.map