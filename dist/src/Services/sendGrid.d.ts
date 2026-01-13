import sgMail from '@sendgrid/mail';
declare function sendEmail(to: string): Promise<[sgMail.ClientResponse, {}] | undefined>;
export default sendEmail;
//# sourceMappingURL=sendGrid.d.ts.map