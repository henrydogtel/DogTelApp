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
exports.CalificationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const califications_service_1 = require("./califications.service");
const calification_entity_1 = require("./entities/calification.entity");
const create_calification_input_1 = require("./dto/create-calification.input");
let CalificationsResolver = class CalificationsResolver {
    constructor(calificationsService) {
        this.calificationsService = calificationsService;
    }
    async createCalification(createCalificationDto) {
        return this.calificationsService.createCalification(createCalificationDto);
    }
};
exports.CalificationsResolver = CalificationsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => calification_entity_1.Calification),
    __param(0, (0, graphql_1.Args)('createCalificationDto')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_calification_input_1.CreateCalificationDto]),
    __metadata("design:returntype", Promise)
], CalificationsResolver.prototype, "createCalification", null);
exports.CalificationsResolver = CalificationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => calification_entity_1.Calification),
    __metadata("design:paramtypes", [califications_service_1.CalificationsService])
], CalificationsResolver);
//# sourceMappingURL=califications.resolver.js.map