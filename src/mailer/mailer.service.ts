import { Injectable } from '@nestjs/common';
import * as Brevo from '@getbrevo/brevo'
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MailerService {

    private apiInstance: Brevo.TransactionalEmailsApi;

    constructor(private configService: ConfigService) {
        const apiKey = this.configService.get<string>('email.key')

        this.apiInstance = new Brevo.TransactionalEmailsApi();

        this.apiInstance.setApiKey(0, apiKey)
    }

    async sendMail(
        to: string,
        subject: string,
        senderName: string = 'No Reply',
        senderEmail: string = 'full01@silerni.com',
    ) {
        const sendSmtpEmail = new Brevo.SendSmtpEmail();

        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = "<html><body><h1>This is a test</h1></body></html>";
        sendSmtpEmail.sender = { name: senderName, email: senderEmail };
        sendSmtpEmail.to = [{ email: to, name: to }];
        sendSmtpEmail.params = {
            name: 'Sebastian 2',
            linkEmailToken: 'https://docs.nestjs.com/techniques/configuration',
        }

        sendSmtpEmail.templateId = 1

        try {
            const data = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
            return data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}
