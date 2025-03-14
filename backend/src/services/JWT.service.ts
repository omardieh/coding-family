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

  private handleRefreshToken = (
    _: Request,
    res: Response,
    next: NextFunction,
    refreshToken: string,
  ): JwtPayloadWithIatExp | null => {
    try {
      const payload = this.verifyJWT(refreshToken);
      const newAccessToken = this.generateJWT(payload);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });
      res.header('Authorization', newAccessToken);
      return payload;
    } catch (error) {
      console.error('Refresh Token verification failed:', error);
      res.status(400).send('Invalid Token.');
      next(error);
      return null;
    }
  };

  isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.headers['authorization'];
    const refreshToken = req.cookies['refreshToken'];
    let payload: JwtPayloadWithIatExp | null = null;
    if (!accessToken && !refreshToken) {
      return next(new Error('Access Denied. No token provided.'));
    }
    try {
      if (accessToken) {
        const decoded = jwt.decode(accessToken as string) as JwtPayloadWithIatExp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
          payload = this.handleRefreshToken(req, res, next, refreshToken);
          if (!payload) {
            next(new Error('Failed to refresh access token.'));
            return;
          }
          (req as Request & { payload?: JwtPayload }).payload = payload;
          next();
          return;
        }
        payload = this.verifyJWT(accessToken as string);
        if (!payload) {
          next(new Error('Failed to refresh access token.'));
          return;
        }
        (req as Request & { payload?: JwtPayload }).payload = payload;
        next();
        return;
      }
      payload = this.handleRefreshToken(req, res, next, refreshToken);
      if (!payload) {
        return next(new Error('Failed to refresh access token.'));
      }
      (req as Request & { payload?: JwtPayload }).payload = payload;
      next();
    } catch (error) {
      next(error);
    }
  };
}
