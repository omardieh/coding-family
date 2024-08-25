import { BaseRouter } from '@/routes';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

class CaptchaRoute extends BaseRouter {
  constructor() {
    super();
    this.router.post('/auth/captcha', this.retrieveCaptchaToken);
  }

  retrieveCaptchaToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { token } = req.body;
    try {
      const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
          secret: process.env.GOOGLE_CAPTCHA_SECRET,
          response: token,
        },
      });
      const { success, score } = response.data;
      if (success && score >= 0.5) {
        res.json({ verified: true });
      } else {
        res.json({ verified: false });
      }
    } catch (error) {
      next(error);
    }
  };
}

export const { router: captchaRoute } = new CaptchaRoute();
