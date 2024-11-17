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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const person_entity_1 = require("../../../global-entities/person.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const calification_entity_1 = require("../../califications/entities/calification.entity");
const credential_entity_1 = require("../../credentials/entities/credential.entity");
const dog_entity_1 = require("../../dogs/entities/dog.entity");
const typeorm_1 = require("typeorm");
let User = class User extends person_entity_1.Person {
    static _OPENAPI_METADATA_FACTORY() {
        return { dogs: { required: true, type: () => [require("../../dogs/entities/dog.entity").Dog] }, appointments: { required: true, type: () => [require("../../appointments/entities/appointment.entity").Appointment] }, credentials: { required: true, type: () => require("../../credentials/entities/credential.entity").Credentials }, califications: { required: true, type: () => [require("../../califications/entities/calification.entity").Calification] } };
    }
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(() => [dog_entity_1.Dog]),
    (0, typeorm_1.OneToMany)(() => dog_entity_1.Dog, (dog) => dog.user),
    __metadata("design:type", Array)
], User.prototype, "dogs", void 0);
__decorate([
    (0, graphql_1.Field)(() => [appointment_entity_1.Appointment]),
    (0, typeorm_1.OneToMany)(() => appointment_entity_1.Appointment, (appointment) => appointment.user),
    __metadata("design:type", Array)
], User.prototype, "appointments", void 0);
__decorate([
    (0, graphql_1.Field)(() => credential_entity_1.Credentials),
    (0, typeorm_1.OneToOne)(() => credential_entity_1.Credentials, (credentials) => credentials.user),
    (0, typeorm_1.JoinColumn)({ name: 'credentials_id' }),
    __metadata("design:type", credential_entity_1.Credentials)
], User.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => calification_entity_1.Calification, (calification) => calification.user),
    __metadata("design:type", Array)
], User.prototype, "califications", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' }),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map