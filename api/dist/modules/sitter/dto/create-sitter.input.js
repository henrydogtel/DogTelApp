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
exports.CreateSitterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_user_input_1 = require("../../user/dto/create-user.input");
const class_validator_1 = require("class-validator");
let CreateSitterInput = class CreateSitterInput extends create_user_input_1.CreateUserInput {
};
exports.CreateSitterInput = CreateSitterInput;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSitterInput.prototype, "rate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateSitterInput.prototype, "fee", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateSitterInput.prototype, "descripcion", void 0);
exports.CreateSitterInput = CreateSitterInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSitterInput);
//# sourceMappingURL=create-sitter.input.js.map