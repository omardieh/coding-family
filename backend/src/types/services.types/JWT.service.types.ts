import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadWithIatExp extends JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export interface IJWTServiceOptions {
  secret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}
