import { Response } from 'express';

export class ResponseHandler {
  sendResponse(res: Response, status = 500, payload: any) {
    res.status(status).json({ ...payload });
    return;
  }
}
