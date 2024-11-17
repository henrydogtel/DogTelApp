"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesSitterModule = void 0;
const common_1 = require("@nestjs/common");
const services_sitter_service_1 = require("./services-sitter.service");
const services_sitter_resolver_1 = require("./services-sitter.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const sitter_entity_1 = require("../sitter/entities/sitter.entity");
const sitter_repository_1 = require("./sitter-repository");
const services_sitter_entity_1 = require("./entities/services-sitter.entity");
let ServicesSitterModule = class ServicesSitterModule {
};
exports.ServicesSitterModule = ServicesSitterModule;
exports.ServicesSitterModule = ServicesSitterModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([sitter_entity_1.Sitter, services_sitter_entity_1.ServicesSitter])],
        providers: [
            services_sitter_resolver_1.ServicesSitterResolver,
            services_sitter_service_1.ServicesSitterService,
            sitter_repository_1.SitterServiceRepository,
        ],
    })
], ServicesSitterModule);
//# sourceMappingURL=services-sitter.module.js.map