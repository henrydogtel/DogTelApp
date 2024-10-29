import { BadRequestException, Injectable } from '@nestjs/common';
import { SendMailInput } from './dto/send-mail.input';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailsService {

    constructor(private readonly mailService: MailerService){}

    sendMail = async (messageObject: SendMailInput) => {
        const {to,subject,text,html} = messageObject
        try {
            const response = await this.mailService.sendMail({
                from:"denebleo08@gmail.com",
                to,
                subject,
                text,
                html
            })
            if(!response) throw new BadRequestException('Hubo un error al enviar el mensaje')
            console.log(response);
            
            return response
        } catch (error) {
            throw error
        }

    }
}
