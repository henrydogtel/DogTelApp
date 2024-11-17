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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const user_entity_1 = require("./entities/user.entity");
const update_user_input_1 = require("./dto/update-user.input");
const common_1 = require("@nestjs/common");
const user_role_enum_1 = require("../../enums/user-role.enum");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(firstname, lastname, birthdate, address, role, password, email) {
        try {
            const userSaved = await this.userService.create({
                firstname,
                lastname,
                birthdate,
                address,
                role,
                password,
                email,
            });
            if (!userSaved)
                throw new common_1.BadRequestException('There was an error creating the user');
            return userSaved;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw new common_1.BadRequestException(error.message || 'An error occurred while creating the user');
        }
    }
    async findAll() {
        try {
            return await this.userService.findAll();
        }
        catch (error) {
            console.error('Error retrieving users:', error);
            throw new common_1.BadRequestException('An error occurred while retrieving users');
        }
    }
    async findOne(id) {
        try {
            return await this.userService.findOne(id);
        }
        catch (error) {
            console.error(`Error retrieving user with id ${id}:`, error);
            throw new common_1.BadRequestException(`An error occurred while retrieving the user with id: ${id}`);
        }
    }
    async updateUser(id, updateUserInput) {
        try {
            return await this.userService.update(id, updateUserInput);
        }
        catch (error) {
            console.error(`Error updating user with id ${id}:`, error);
            throw new common_1.BadRequestException(`An error occurred while updating the user with id: ${id}`);
        }
    }
    async removeUser(id) {
        try {
            await this.userService.removeUser(id);
        }
        catch (error) {
            console.error(`Error removing user with id ${id}:`, error);
            throw new common_1.BadRequestException(`An error occurred while removing the user with id: ${id}`);
        }
    }
    async findOneByEmail(email) {
        return this.userService.findOneByEmail(email);
    }
    async updateUserImage(id, userImg) {
        const userUpdated = await this.userService.updateUserImage(id, userImg);
        return userUpdated;
    }
};
exports.UserResolver = UserResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('firstname')),
    __param(1, (0, graphql_1.Args)('lastname')),
    __param(2, (0, graphql_1.Args)('birthdate')),
    __param(3, (0, graphql_1.Args)('address')),
    __param(4, (0, graphql_1.Args)('role')),
    __param(5, (0, graphql_1.Args)('password')),
    __param(6, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'user' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __param(1, (0, graphql_1.Args)('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "removeUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_entity_1.User, { name: 'userByEmail' }),
    __param(0, (0, graphql_1.Args)('email', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findOneByEmail", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('userImg')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserImage", null);
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map