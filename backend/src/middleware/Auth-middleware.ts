import { JWTService } from "@/services";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {
  private jwtService: JWTService;
  constructor(jwtService: JWTService) {
    this.jwtService = jwtService;
  }
  isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const accessToken = req.headers["authorization"];
    const refreshToken = req.cookies["refreshToken"];
    if (!accessToken && !refreshToken) {
      return res.status(401).send("Access Denied. No token provided.");
    }
    try {
      const payload = this.jwtService.verifyJWT(accessToken as string);
      req.payload = payload;
      return next();
    } catch (error) {
      if (!refreshToken) {
        res.status(401).send("Access Denied. No refresh token provided.");
        return next(error);
      }
      try {
        const payload = this.jwtService.verifyJWT(refreshToken);
        const newAccessToken = this.jwtService.generateJWT(payload);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
        res.header("Authorization", newAccessToken);
        req.payload = payload;
        return next();
      } catch (error) {
        res.status(400).send("Invalid Token.");
        return next(error);
      }
    }
  }
}
