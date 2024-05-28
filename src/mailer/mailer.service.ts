import { Injectable } from '@nestjs/common';
import * as Brevo from '@getbrevo/brevo'
import { ConfigService } from '@nestjs/config';
import { User } from 'src/generated/nestjs-dto/user.entity';


@Injectable()
export class MailerService {
    private sender: string;
    private nameSender: string;
    private apiInstance: Brevo.TransactionalEmailsApi;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('email.key')
        this.sender = this.configService.get<string>('email.sender')
        this.nameSender = this.configService.get<string>('email.nameSender')

        this.apiInstance = new Brevo.TransactionalEmailsApi();

        this.apiInstance.setApiKey(0, apiKey)
    }

    async sendMail(
        subject: string,
        to: string,
        templateId: number,
        params: any,
    ) {
        const sendSmtpEmail = new Brevo.SendSmtpEmail();

        sendSmtpEmail.sender = { name: this.nameSender, email: this.sender };
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.to = [{ email: to, name: to }];
        sendSmtpEmail.templateId = templateId

        sendSmtpEmail.params = params


        try {
            const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }

    async sendConfirmEmail(user: User, emailToken: string) {
        await this.sendMail(
            'Confirmar E-mail',
            user.credential.email,
            1,
            {
                name: user.name,
                linkEmailToken: `${emailToken}`,
            }
        )
    }
}
