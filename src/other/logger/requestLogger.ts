import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import logger from './logger.js';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const { protocol, method, originalUrl, body, query } = req;
  next();

  finished(res, () => {
    logger.info(`Request ${protocol} ${method} ${originalUrl}, body: ${JSON.stringify(body)}, query parameters: ${JSON.stringify(query)} responded with status ${res.statusCode}`);
  });
} 