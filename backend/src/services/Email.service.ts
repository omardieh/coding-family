import { IUserModel } from '@/types';
import crypto from 'crypto';
import { readFileSync } from 'fs';
import nodemailer, { Transporter } from 'nodemailer';
import { join } from 'path';

export class EmailService {
  private transporter: Transporter;
  private user: string;
  private from: string;

  constructor() {
    const host = process.env.MAIL_HOST || '';
    const port = parseInt(process.env.MAIL_PORT || '0', 10);
    const user = process.env.MAIL_USER || '';
    const pass = process.env.MAIL_PASS || '';
    const from = process.env.MAIL_FROM || '';
    if (!host || !port || !user || !pass || !from) {
      throw new Error('Email configuration is incomplete. Please check your environment variables.');
    }
    this.user = user;
    this.from = from;

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
  sendEmailVerify = async (
    createdUser: IUserModel,
    emailVerifyCode: string,
    emailVerifyToken: string,
  ): Promise<void> => {
    try {
      const emailTemplatePath = join(__dirname, '../utils/emailTemplates/verify.html');
      const emailTemplate = readFileSync(emailTemplatePath, 'utf-8');
      const linkToSend = `${process.env.CLIENT_URL}/email/verify?userID=${createdUser._id}&code=${emailVerifyCode}&token=${emailVerifyToken}`;
      const logoContentID = 'logo@coding.family';
      const emailVerifyHTML = emailTemplate
        .replaceAll('{{verificationLink}}', linkToSend)
        .replace('{{userName}}', createdUser.username)
        .replace('{{logoUrl}}', `cid:${logoContentID}`);
      const mailOptions = {
        from: `${this.from} <${this.user}>`,
        to: createdUser.email,
        subject: 'Please Verify Your Email',
        html: emailVerifyHTML,
        attachments: [
          {
            filename: 'site-logo.png',
            path: `${process.env.CLIENT_URL}/site-logo.png`,
            cid: logoContentID,
          },
        ],
      };
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email.');
    }
  };
  getRandomString = (): string => {
    return crypto.randomBytes(64).toString('hex');
  };
  getExpirationDate = (minutes: number): Date => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + minutes);
    return expirationDate;
  };
}
