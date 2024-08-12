import jwt, { JwtPayload } from "jsonwebtoken";

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

export class JWTService {
  private readonly secret: string;
  private readonly accessTokenExpiresIn: string;
  private readonly refreshTokenExpiresIn: string;

  constructor(options: JWTServiceOptions) {
    this.secret = options.secret;
    this.accessTokenExpiresIn = options.accessTokenExpiresIn || "5m";
    this.refreshTokenExpiresIn = options.refreshTokenExpiresIn || "1d";
  }

  generateJWT(
    payload: JwtPayloadWithIatExp,
    isRefresh: boolean = false
  ): string {
    const expiresIn = isRefresh
      ? this.refreshTokenExpiresIn
      : this.accessTokenExpiresIn;
    return jwt.sign(payload, this.secret, {
      algorithm: "HS256",
      expiresIn,
    });
  }

  verifyJWT(token: string): JwtPayloadWithIatExp {
    try {
      return jwt.verify(token, this.secret) as JwtPayloadWithIatExp;
    } catch (error) {
      throw new Error("Invalid Token.");
    }
  }
}
