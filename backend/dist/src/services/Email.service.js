"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = require("fs");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = require("path");
class EmailService {
    constructor() {
        this.sendEmailVerify = async (createdUser, emailVerifyCode, emailVerifyToken) => {
            try {
                const emailTemplatePath = (0, path_1.join)(__dirname, '../utils/emailTemplates/verify.html');
                const emailTemplate = (0, fs_1.readFileSync)(emailTemplatePath, 'utf-8');
                const linkToSend = `${process.env.CLIENT_URL}/notification?userID=${createdUser._id}&code=${emailVerifyCode}&token=${emailVerifyToken}`;
                const emailVerifyHTML = emailTemplate.replace('{{verificationLink}}', linkToSend);
                const mailOptions = {
                    from: process.env.MAIL_FROM || '',
                    to: createdUser.email,
                    subject: 'Please Verify Your Email',
                    html: emailVerifyHTML,
                };
                await this.transporter.sendMail(mailOptions);
            }
            catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send verification email.');
            }
        };
        this.getRandomString = () => {
            return crypto_1.default.randomBytes(64).toString('hex');
        };
        this.getExpirationDate = (minutes) => {
            const expirationDate = new Date();
            expirationDate.setMinutes(expirationDate.getMinutes() + minutes);
            return expirationDate;
        };
        const host = process.env.MAIL_HOST || '';
        const port = parseInt(process.env.MAIL_PORT || '0', 10);
        const user = process.env.MAIL_USER || '';
        const pass = process.env.MAIL_PASS || '';
        if (!host || !port || !user || !pass) {
            throw new Error('Email configuration is incomplete. Please check your environment variables.');
        }
        this.transporter = nodemailer_1.default.createTransport({
            host,
            port,
            secure: true,
            auth: {
                user,
                pass,
            },
        });
    }
}
exports.EmailService = EmailService;
