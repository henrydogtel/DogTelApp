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
exports.CreateDogInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const dog_entity_1 = require("../entities/dog.entity");
let CreateDogInput = class CreateDogInput {
};
exports.CreateDogInput = CreateDogInput;
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'The name of the pet' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'The birthdate of the dog' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateDogInput.prototype, "birthdate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { description: 'List of image URLs for the dog' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    __metadata("design:type", Array)
], CreateDogInput.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Race of the dog' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDogInput.prototype, "race", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Size of the dog' }),
    (0, class_validator_1.IsEnum)(dog_entity_1.typeRace),
    __metadata("design:type", String)
], CreateDogInput.prototype, "size", void 0);
exports.CreateDogInput = CreateDogInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDogInput);
//# sourceMappingURL=create-dog.input.js.map