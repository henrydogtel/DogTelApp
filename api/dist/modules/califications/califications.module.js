"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalificationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const califications_service_1 = require("./califications.service");
const califications_resolver_1 = require("./califications.resolver");
const calification_entity_1 = require("./entities/calification.entity");
const user_entity_1 = require("../user/entities/user.entity");
const sitter_entity_1 = require("../sitter/entities/sitter.entity");
let CalificationsModule = class CalificationsModule {
};
exports.CalificationsModule = CalificationsModule;
exports.CalificationsModule = CalificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([calification_entity_1.Calification, user_entity_1.User, sitter_entity_1.Sitter])],
        providers: [califications_service_1.CalificationsService, califications_resolver_1.CalificationsResolver],
        exports: [califications_service_1.CalificationsService],
    })
], CalificationsModule);
//# sourceMappingURL=califications.module.js.map