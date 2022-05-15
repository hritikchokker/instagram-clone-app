import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // use SSL
  auth: {
    user: 'deangelo.tremblay94@ethereal.email',
    pass: 'Q2XNRmANcu9z72RBZD',
    // Deangelo Tremblay
  },
});
export class MailManager {
  async sendMailViaSmtp(params) {
    try {
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'no-reply@gmail.com',
        to: params.email,
        subject: params.subject,
        html: params.html,
        // `<h1>find the link to reset your password ${params.token}</h1>`,
        // bcc: config.CONSTANT.EMAIL_TEMPLATE.BCC_MAIL,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Message sent: ' + info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
    return {};
  }
}
