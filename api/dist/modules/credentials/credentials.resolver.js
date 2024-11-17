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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const credentials_service_1 = require("./credentials.service");
const credential_entity_1 = require("./entities/credential.entity");
const create_credential_input_1 = require("./dto/create-credential.input");
let CredentialsResolver = class CredentialsResolver {
    constructor(credentialsService) {
        this.credentialsService = credentialsService;
    }
    async createCredential(createCredentialInput) {
        try {
            return await this.credentialsService.create(createCredentialInput);
        }
        catch (error) {
            console.error('Error creating credential:', error);
            throw new Error('An error occurred while creating the credential. Please try again.');
        }
    }
    async findAll() {
        try {
            return await this.credentialsService.findAll();
        }
        catch (error) {
            console.error('Error retrieving credentials:', error);
            throw new Error('An error occurred while retrieving credentials. Please try again.');
        }
    }
};
exports.CredentialsResolver = CredentialsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => credential_entity_1.Credentials),
    __param(0, (0, graphql_1.Args)('createCredentialInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_credential_input_1.CreateCredentialInput]),
    __metadata("design:returntype", Promise)
], CredentialsResolver.prototype, "createCredential", null);
__decorate([
    (0, graphql_1.Query)(() => [credential_entity_1.Credentials], { name: 'credentials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CredentialsResolver.prototype, "findAll", null);
exports.CredentialsResolver = CredentialsResolver = __decorate([
    (0, graphql_1.Resolver)(() => credential_entity_1.Credentials),
    __metadata("design:paramtypes", [credentials_service_1.CredentialsService])
], CredentialsResolver);
//# sourceMappingURL=credentials.resolver.js.map