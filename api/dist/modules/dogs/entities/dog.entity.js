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
exports.Dog = exports.typeRace = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const appointment_detail_entity_1 = require("../../appointment_details/entities/appointment_detail.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
var typeRace;
(function (typeRace) {
    typeRace["SMALL"] = "small";
    typeRace["MEDIUM"] = "medium";
    typeRace["LARGE"] = "large";
})(typeRace || (exports.typeRace = typeRace = {}));
let Dog = class Dog {
    constructor() {
        this.id = (0, uuid_1.v4)();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, default: (0, uuid_1.v4)() }, name: { required: true, type: () => String }, birthdate: { required: true, type: () => Date }, images: { required: false, type: () => [String] }, race: { required: true, type: () => String }, size: { required: true, enum: require("./dog.entity").typeRace }, user: { required: true, type: () => require("../../user/entities/user.entity").User }, details: { required: true, type: () => [require("../../appointment_details/entities/appointment_detail.entity").AppointmentDetail] } };
    }
};
exports.Dog = Dog;
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Unique ID for the dog' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Dog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'name' }),
    (0, graphql_1.Field)(() => String, { description: 'The name of the pet' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The name is required' }),
    (0, class_validator_1.IsString)({ message: 'The name must be a text string' }),
    __metadata("design:type", String)
], Dog.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'birthdate' }),
    (0, graphql_1.Field)(() => String, { description: 'The birthdate of the dog' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The birthdate is required' }),
    (0, class_validator_1.IsDate)({ message: 'The birthdate must be a valid date' }),
    __metadata("design:type", Date)
], Dog.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'images' }),
    (0, graphql_1.Field)(() => [String], { description: 'List of image URLs for the dog' }),
    (0, class_validator_1.IsArray)({ message: 'Images must be in an array' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Each image URL must be a text string' }),
    __metadata("design:type", Array)
], Dog.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'race' }),
    (0, graphql_1.Field)(() => String, { description: 'Race of the dog' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The race is required' }),
    (0, class_validator_1.IsString)({ message: 'The race must be a text string' }),
    __metadata("design:type", String)
], Dog.prototype, "race", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: typeRace }),
    (0, graphql_1.Field)(() => String, { description: 'Size of the dog' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'The size is required' }),
    (0, class_validator_1.IsEnum)(typeRace, {
        message: 'The size must be one of the allowed values: SMALL, MEDIUM, LARGE',
    }),
    __metadata("design:type", String)
], Dog.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.dogs),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Dog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_detail_entity_1.AppointmentDetail, (details) => details.dog),
    (0, graphql_1.Field)(() => [appointment_detail_entity_1.AppointmentDetail]),
    __metadata("design:type", Array)
], Dog.prototype, "details", void 0);
exports.Dog = Dog = __decorate([
    (0, typeorm_1.Entity)({ name: 'dogs' }),
    (0, graphql_1.ObjectType)()
], Dog);
//# sourceMappingURL=dog.entity.js.map