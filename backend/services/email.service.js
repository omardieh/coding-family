const crypto = require("crypto");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendEmailVerify(createdUser, emailVerifyCode, emailVerifyToken) {
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, "../utils/emailTemplates/verify.html"),
      "utf-8"
    );
    const linkToSend = `${process.env.CLIENT_URL}/verification?userID=${createdUser._id}&code=${emailVerifyCode}&token=${emailVerifyToken}`;
    const emailVerifyHTML = emailTemplate.replace(
      "{{verificationLink}}",
      linkToSend
    );
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: createdUser.email,
      subject: "Please Verify Your Email",
      html: emailVerifyHTML,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("sending Email Error: ", error);
    }
  }

  getRandomString() {
    const randomString = crypto.randomBytes(64).toString("hex");
    return randomString;
  }

  getExpirationDate(minutes) {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + minutes);
    return expirationDate;
  }
}

module.exports = new EmailService();
