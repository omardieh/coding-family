import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadWithIatExp extends JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export interface JWTServiceOptions {
  secret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}
