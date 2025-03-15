import { BlockedIPModel } from '@/models/BlockedIP.model';
import { NextFunction, Request, Response } from 'express';

export const checkIPBlocking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const blockedIP = await BlockedIPModel.findOne({ ipAddress: ip });
    if (blockedIP && blockedIP.blockedUntil && blockedIP.blockedUntil > new Date()) {
      const minutesLeft = Math.ceil((blockedIP.blockedUntil.getTime() - Date.now()) / 1000 / 60);
      res.status(429).json(`IP address temporarily blocked. Please try again in ${minutesLeft} minutes.`);
      return;
    }
    next();
  } catch (error) {
    console.error('IP blocking middleware error:', error);
    next();
  }
};
