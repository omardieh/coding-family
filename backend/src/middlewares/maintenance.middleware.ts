import { NextFunction, Request, Response } from 'express';

export const maintenanceMiddleware = (_: Request, res: Response, next: NextFunction): void => {
  const isMaintenanceMode = process.env.IS_MAINTENANCE === 'true';
  if (isMaintenanceMode) {
    res.render('maintenance-mode');
    return;
  }
  next();
};
