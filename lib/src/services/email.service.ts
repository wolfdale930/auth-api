const nodemailer = require('nodemailer')
import fs from 'fs';
import { Config } from '../config';
import { EmailType } from '../enums/email-types.enum';

export class EmailService {
    static templates: any = {};
    static transporter: any;
    static init() {
        const files = fs.readdirSync(`templates/`);
        files.forEach((file: string) => {
            const content = fs.readFileSync(`templates/${file}`, "utf-8");
            const fileNameSplit = file.split('.');
            if (fileNameSplit[0]) {
                this.templates[fileNameSplit[0]] = content;
            }
        });
        EmailService.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: Config.Mailer.emailId,
                pass: Config.Mailer.password,
                clientId: Config.Mailer.clientId,
                clientSecret: Config.Mailer.clientSecret,
                refreshToken: Config.Mailer.refreshToken
            }
        });
    }

    static sendEmail(email: string, emailType: EmailType) {
        return new Promise((resolve, reject) => {
            const template = EmailService.templates[emailType.toString()];
            if (!template) {
                console.log(`Template not found: ${emailType.toString()}`);
                return;
            }

            const mailData = {
                from: Config.Mailer.emailId,
                to: email,
                subject: EmailService.getSubject(emailType),
                html: template
            };
            EmailService.transporter.sendMail(mailData, function (error: any, info: any) {
                if (error) console.log(error);
                console.log('Email Sent Successfully');
                console.log(info);
            });
        });
    }

    private static getSubject(emailType: EmailType) {
        switch (emailType) {
            case EmailType.CONFIRMATION:
                return "User Confirmation";
            default:
                return "";
        }
    }
}