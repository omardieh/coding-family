import { IUser } from '@/types';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import { join } from 'path';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    const host = process.env.MAIL_HOST || '';
    const port = parseInt(process.env.MAIL_PORT || '0', 10);
    const user = process.env.MAIL_USER || '';
    const pass = process.env.MAIL_PASS || '';

    if (!host || !port || !user || !pass) {
      throw new Error('Email configuration is incomplete. Please check your environment variables.');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }

  public async sendEmailVerify(createdUser: IUser, emailVerifyCode: string, emailVerifyToken: string): Promise<void> {
    try {
      const emailTemplatePath = join(__dirname, '../utils/emailTemplates/verify.html');
      const emailTemplate = readFileSync(emailTemplatePath, 'utf-8');

      const linkToSend = `${process.env.CLIENT_URL}/notification?userID=${createdUser._id}&code=${emailVerifyCode}&token=${emailVerifyToken}`;
      const emailVerifyHTML = emailTemplate.replace('{{verificationLink}}', linkToSend);

      const mailOptions = {
        from: process.env.MAIL_FROM || '',
        to: createdUser.email,
        subject: 'Please Verify Your Email',
        html: emailVerifyHTML,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email.');
    }
  }

  public getRandomString(): string {
    return crypto.randomBytes(64).toString('hex');
  }

  public getExpirationDate(minutes: number): Date {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + minutes);
    return expirationDate;
  }
}
