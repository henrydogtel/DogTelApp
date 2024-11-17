"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user.service");
const user_resolver_1 = require("./user.resolver");
const user_entity_1 = require("./entities/user.entity");
const platform_express_1 = require("@nestjs/platform-express");
const axios_1 = require("@nestjs/axios");
const credential_entity_1 = require("../credentials/entities/credential.entity");
const credentials_service_1 = require("../credentials/credentials.service");
const credentials_module_1 = require("../credentials/credentials.module");
const auth_module_1 = require("../auth/auth.module");
const send_mails_service_1 = require("../send-mails/send-mails.service");
const send_mails_module_1 = require("../send-mails/send-mails.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, credential_entity_1.Credentials]),
            auth_module_1.AuthModule,
            axios_1.HttpModule,
            platform_express_1.MulterModule.register(),
            credentials_module_1.CredentialsModule,
            send_mails_module_1.SendMailsModule,
        ],
        providers: [user_resolver_1.UserResolver, user_service_1.UserService, credentials_service_1.CredentialsService, send_mails_service_1.SendMailsService],
        exports: [typeorm_1.TypeOrmModule],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map