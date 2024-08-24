import { JwtPayloadWithIatExp } from '@/types';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export class JWTService {
  private readonly secret: string;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;

  constructor() {
    this.secret = process.env.JWT_TOKEN_SECRET || '';
    this.accessTokenExpiresIn = '5m';
    this.refreshTokenExpiresIn = '1d';
  }

  generateJWT = (payload: JwtPayloadWithIatExp, isRefresh: boolean = false): string => {
    const expiresIn = isRefresh ? this.refreshTokenExpiresIn : this.accessTokenExpiresIn;
    const secret = this.secret;
    if (!secret) {
      throw new Error('JWT secret is not defined.');
    }
    const options: SignOptions = {
      algorithm: 'HS256',
      ...(!payload.exp && { expiresIn }),
    };
    return jwt.sign(payload, secret, options);
  };

  verifyJWT = (token: string): JwtPayloadWithIatExp => {
    try {
      return jwt.verify(token, this.secret) as JwtPayloadWithIatExp;
    } catch (error) {
      console.error(error);
      throw new Error('Invalid Token.');
    }
  };

  isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies['refreshToken'];
    if (!accessToken && !refreshToken) {
      res.status(401).send('Access Denied. No token provided.');
      return;
    }
    try {
      const payload = this.verifyJWT(accessToken as string);
      (req as Request & { payload?: JwtPayload }).payload = payload;
      next();
      return;
    } catch (error) {
      if (!refreshToken) {
        res.status(401).send('Access Denied. No refresh token provided.');
        return next(error);
      }
      try {
        const payload = this.verifyJWT(refreshToken);
        const newAccessToken = this.generateJWT(payload);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: true,
        });
        res.header('Authorization', newAccessToken);
        (req as Request & { payload?: JwtPayload }).payload = payload;
        next();
        return;
      } catch (error) {
        res.status(400).send('Invalid Token.');
        return next(error);
      }
    }
  };
}
