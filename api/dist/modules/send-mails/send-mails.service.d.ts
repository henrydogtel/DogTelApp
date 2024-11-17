import { SendMailInput } from './dto/send-mail.input';
import { MailerService } from '@nestjs-modules/mailer';
export declare class SendMailsService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail: (messageObject: SendMailInput) => Promise<any>;
}
