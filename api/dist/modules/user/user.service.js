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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const cloudinary_1 = require("cloudinary");
const credentials_repository_1 = require("../credentials/credentials.repository");
const auth_repository_1 = require("../auth/auth.repository");
const send_mails_service_1 = require("../send-mails/send-mails.service");
let UserService = class UserService {
    constructor(userRepository, credentialRepository, authRepository, sendMailService) {
        this.userRepository = userRepository;
        this.credentialRepository = credentialRepository;
        this.authRepository = authRepository;
        this.sendMailService = sendMailService;
    }
    async updateUserImage(id, userImg) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        user.userImg = userImg;
        return this.userRepository.save(user);
    }
    async findOneByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { credentials: { email } },
            relations: ['credentials'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async create(createUserInput) {
        const hashedPassword = await this.authRepository.hashPassword(createUserInput.password);
        const { firstname, lastname, birthdate, role, address, password, email } = createUserInput;
        try {
            const credentials = await this.credentialRepository.create({
                password: hashedPassword,
                email,
            });
            if (!credentials)
                throw new common_1.BadRequestException('Hubo un error al crear las credenciales');
            const newUser = this.userRepository.create({
                firstname,
                lastname,
                birthdate,
                address,
                role,
                credentials,
            });
            const userSaved = await this.userRepository.save(newUser);
            if (!userSaved)
                throw new common_1.BadRequestException('Hubo un error al guardar el usuario');
            const response = await this.sendMailService.sendMail({
                to: userSaved.credentials.email,
                subject: '¡Bienvenido a nuestra comunidad de cuidadores de mascotas!',
                text: '¡Gracias por unirte a nosotros!',
                html: `
            <html>
            <body style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 800px; margin: auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #4CAF50;">¡Bienvenido a nuestra comunidad!</h1>
                    <img src='https://firebasestorage.googleapis.com/v0/b/dogtel-8ee94.appspot.com/o/marron.png?alt=media&token=55fae421-15ae-453d-bed9-82010c30d8c3' alt="Cuidado de mascotas" style="width: 100%; border-radius: 8px;"/>
                    <p style="font-size: 16px; color: #555;">
                    <strong>${userSaved.firstname}!</strong> Nos alegra que te hayas unido. Aquí encontrarás cuidadores apasionados que se encargarán de tu perro con mucho amor y dedicación. 
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                    </p>
                    <p style="font-size: 16px; color: #555;">¡Esperamos que tu experiencia sea maravillosa!</p>
                    <footer style="margin-top: 20px; font-size: 14px; color: #777;">
                        &copy; 2025 Dogtel
                    </footer>
                </div>
            </body>
            </html>
        `,
            });
            if (!response)
                throw new common_1.BadRequestException('Hubo un error al enviar el email de bienvenida');
            return userSaved;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async update(id, updateUserInput) {
        const user = await this.userRepository.preload({
            id,
            ...updateUserInput,
        });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return this.userRepository.save(user);
    }
    async removeUser(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    async uploadProfilePicture(userId, file) {
        const uploadResult = await cloudinary_1.v2.uploader.upload(file.path, {
            public_id: file.originalname.split('.')[0],
        });
        const user = await this.userRepository.findOne({
            where: { id: String(userId) },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        user.userImg = uploadResult.secure_url;
        await this.userRepository.save(user);
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        credentials_repository_1.CredentialsRepository,
        auth_repository_1.AuthRepository,
        send_mails_service_1.SendMailsService])
], UserService);
//# sourceMappingURL=user.service.js.map