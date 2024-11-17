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
exports.SendMailsService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let SendMailsService = class SendMailsService {
    constructor(mailService) {
        this.mailService = mailService;
        this.sendMail = async (messageObject) => {
            const { to, subject, text, html } = messageObject;
            try {
                const response = await this.mailService.sendMail({
                    from: 'denebleo08@gmail.com',
                    to,
                    subject,
                    text,
                    html,
                });
                if (!response)
                    throw new common_1.BadRequestException('Hubo un error al enviar el mensaje');
                console.log(response);
                return response;
            }
            catch (error) {
                throw error;
            }
        };
    }
};
exports.SendMailsService = SendMailsService;
exports.SendMailsService = SendMailsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], SendMailsService);
//# sourceMappingURL=send-mails.service.js.map