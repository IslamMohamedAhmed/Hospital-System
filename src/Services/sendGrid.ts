import jwt from 'jsonwebtoken';
import sgMail, { type MailDataRequired } from '@sendgrid/mail';
import { createTemplate } from './template.js';
import { env } from 'prisma/config';
async function sendEmail(to: string) {
    sgMail.setApiKey(env('SENDGRID_API_KEY'));
    const email = to;
    let token = jwt.sign({ email }, env('JWT_KEY_SIGNUP'));
    const msg: MailDataRequired = {
        to,
        from: env('FROM_EMAIL'),
        subject: "Hello from Shubra Hospital ✔",
        text: "Please verify your email!!",
        html: createTemplate(token),
    };

    try {
        const result = await sgMail.send(msg);
        console.log('Email sent ✔️');
        return result;
    } catch (error: any) {
        console.error('SendGrid Error ❌', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
}

export default sendEmail;
