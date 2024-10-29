import { Module } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';

@Module({
  providers: [SendMailsService],
})
export class SendMailsModule {}
