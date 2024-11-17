"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitterModule = void 0;
const common_1 = require("@nestjs/common");
const sitter_service_1 = require("./sitter.service");
const sitter_resolver_1 = require("./sitter.resolver");
const sitter_entity_1 = require("./entities/sitter.entity");
const typeorm_1 = require("@nestjs/typeorm");
const credentials_service_1 = require("../credentials/credentials.service");
const auth_module_1 = require("../auth/auth.module");
const credentials_module_1 = require("../credentials/credentials.module");
const user_module_1 = require("../user/user.module");
const user_entity_1 = require("../user/entities/user.entity");
let SitterModule = class SitterModule {
};
exports.SitterModule = SitterModule;
exports.SitterModule = SitterModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sitter_entity_1.Sitter, user_entity_1.User]),
            auth_module_1.AuthModule,
            credentials_module_1.CredentialsModule,
            user_module_1.UserModule,
        ],
        providers: [sitter_resolver_1.SitterResolver, sitter_service_1.SitterService, credentials_service_1.CredentialsService],
    })
], SitterModule);
//# sourceMappingURL=sitter.module.js.map