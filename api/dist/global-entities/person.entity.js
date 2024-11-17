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
exports.Person = void 0;
const openapi = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../enums/user-role.enum");
const typeorm_1 = require("typeorm");
let Person = class Person {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstname: { required: true, type: () => String, minLength: 1, maxLength: 255 }, lastname: { required: true, type: () => String, minLength: 1, maxLength: 255 }, birthdate: { required: true, type: () => Date }, address: { required: false, type: () => String, minLength: 1, maxLength: 255 }, role: { required: false, enum: require("../enums/user-role.enum").UserRole }, userImg: { required: true, type: () => String } };
    }
};
exports.Person = Person;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Person.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, class_validator_1.IsString)({ message: 'Firstname must be a string' }),
    (0, class_validator_1.Length)(1, 255, { message: 'Firstname must be between 1 and 255 characters' }),
    __metadata("design:type", String)
], Person.prototype, "firstname", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, class_validator_1.IsString)({ message: 'Lastname must be a string' }),
    (0, class_validator_1.Length)(1, 255, { message: 'Lastname must be between 1 and 255 characters' }),
    __metadata("design:type", String)
], Person.prototype, "lastname", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, class_validator_1.IsDate)({ message: 'Birthdate must be a valid date' }),
    __metadata("design:type", Date)
], Person.prototype, "birthdate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    (0, class_validator_1.IsString)({ message: 'Address must be a string' }),
    (0, class_validator_1.Length)(1, 255, { message: 'Address must be between 1 and 255 characters' }),
    __metadata("design:type", String)
], Person.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.USER,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole, { message: 'Role must be a valid UserRole' }),
    __metadata("design:type", String)
], Person.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)({
        default: 'https://thumbs.dreamstime.com/b/perfil-de-usuario-vectorial-avatar-predeterminado-179376714.jpg',
    }),
    (0, class_validator_1.IsUrl)({}, { message: 'User image must be a valid URL' }),
    __metadata("design:type", String)
], Person.prototype, "userImg", void 0);
exports.Person = Person = __decorate([
    (0, graphql_1.ObjectType)()
], Person);
//# sourceMappingURL=person.entity.js.map