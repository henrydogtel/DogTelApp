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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async validateUser(email, password) {
        const credentials = await this.authRepository.findOneByEmail(email);
        if (credentials) {
            const isValidPassword = await this.authRepository.validatePassword(password, credentials.password);
            if (isValidPassword) {
                const { password, ...result } = credentials;
                return result;
            }
        }
        return null;
    }
    async login(user) {
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.sitter ? user.sitter && user.sitter.role : user.user.role,
        };
        console.log(user);
        try {
            const access_token = this.authRepository.generateToken(payload);
            return {
                access_token,
                email: user.email,
                role: user.sitter ? user.sitter && user.sitter.role : user.user.role,
                user: user.sitter ? user.sitter : user.user && user.user,
            };
        }
        catch (error) {
            console.error('Error generating token:', error.message);
            throw new Error('Error generating token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map