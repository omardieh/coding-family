import { JwtPayloadWithIatExp, JWTServiceOptions } from '@/types';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class JWTService {
  private readonly secret: string;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;

  constructor(options: JWTServiceOptions) {
    this.secret = options.secret;
    this.accessTokenExpiresIn = options.accessTokenExpiresIn || '5m';
    this.refreshTokenExpiresIn = options.refreshTokenExpiresIn || '1d';
  }

  public generateJWT(payload: JwtPayloadWithIatExp, isRefresh: boolean = false): string {
    const expiresIn = isRefresh ? this.refreshTokenExpiresIn : this.accessTokenExpiresIn;
    return jwt.sign(payload, this.secret, {
      algorithm: 'HS256',
      expiresIn,
    });
  }

  public verifyJWT(token: string): JwtPayloadWithIatExp {
    try {
      return jwt.verify(token, this.secret) as JwtPayloadWithIatExp;
    } catch (error) {
      throw new Error('Invalid Token.');
    }
  }

  public isAuthenticated(req: Request, res: Response, next: NextFunction): void {
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
        return next();
      } catch (error) {
        res.status(400).send('Invalid Token.');
        return next(error);
      }
    }
  }
}
