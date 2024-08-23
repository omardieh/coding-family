import { Request } from 'express';

export interface RequestWithPayload extends Request {
  payload?: { _id: string };
}
