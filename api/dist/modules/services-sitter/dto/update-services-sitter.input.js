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
exports.UpdateServicesSitterInput = void 0;
const create_services_sitter_input_1 = require("./create-services-sitter.input");
const graphql_1 = require("@nestjs/graphql");
const uuid_1 = require("uuid");
let UpdateServicesSitterInput = class UpdateServicesSitterInput extends (0, graphql_1.PartialType)(create_services_sitter_input_1.CreateServicesSitterInput) {
    constructor() {
        super(...arguments);
        this.id = (0, uuid_1.v4)();
    }
};
exports.UpdateServicesSitterInput = UpdateServicesSitterInput;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateServicesSitterInput.prototype, "id", void 0);
exports.UpdateServicesSitterInput = UpdateServicesSitterInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateServicesSitterInput);
//# sourceMappingURL=update-services-sitter.input.js.map