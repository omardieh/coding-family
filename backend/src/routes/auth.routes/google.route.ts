import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import qs from 'qs';

class GoogleRoute extends BaseRouter {
  constructor() {
    super();
    this.router.get('/auth/google', this.getGoogleAuthRedirectURL);
    this.router.post('/auth/google', this.retrieveGoogleAuthToken);
  }

  getGoogleAuthRedirectURL = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email&access_type=offline`;
      res.redirect(googleAuthURL);
    } catch (error) {
      next(error);
      res.status(500).send('Internal Server Error');
    }
  };
  retrieveGoogleAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { code } = req.body;
    if (!code) {
      res.status(404).json('code not found');
    }
    try {
      const getAccessToken = await axios.post(
        'https://www.googleapis.com/oauth2/v4/token',
        qs.stringify({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token } = getAccessToken.data;

      const getUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const user = getUserInfo.data;
      if (!user) {
        res.status(401).json('Unauthorized');
        return;
      }
      const { name, picture, email } = getUserInfo.data;
      const foundUsers = await UserModel.find({
        $or: [{ googleID: email }, { email: email }],
      });
      if (foundUsers.length) {
        const [foundUser] = foundUsers;
        const { _id, fullName, avatar, username } = foundUser;
        const payload = {
          _id: _id as string,
          username: username as string,
          fullName: fullName as string,
          avatar: avatar as string,
        };
        const refreshToken = this.JWTService.generateJWT(payload, true);
        const accessToken = this.JWTService.generateJWT(payload);
        res
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
          })
          .set('Access-Control-Expose-Headers', 'Authorization')
          .header('Authorization', `Bearer ${accessToken}`)
          .json(payload);
        return;
      }
      const createdUser = await UserModel.create({
        username: email.replace(/[^a-zA-Z0-9]/g, '_'),
        googleID: email,
        email: email,
        fullName: name,
        avatar: picture,
        isEmailVerified: true,
        emailVerifyCode: 'verified',
      });
      const { _id, username, fullName, avatar } = createdUser;
      const payload = { _id, username, fullName, avatar };
      const refreshToken = this.JWTService.generateJWT(payload, true);
      const accessToken = this.JWTService.generateJWT(payload);
      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
        })
        .set('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', `Bearer ${accessToken}`)
        .json(payload);
    } catch (error) {
      console.error('google auth error: ', error);
      next(error);
    }
  };
}

export const { router: googleRoute } = new GoogleRoute();
