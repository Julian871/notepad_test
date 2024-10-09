import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(protected readonly mailerService: MailerService) {}

  async sendConfirmCode(email: string, confirmCode: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmation Email',
      html: `<h1>Thanks for your registration</h1>
      <p>To finish registration please copy code: ${confirmCode}</p>`,
    });
  }
}
