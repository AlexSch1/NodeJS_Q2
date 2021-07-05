import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import logger from './logger.js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { method, url } = request;
    const start = Date.now();

    response.on('finish', () => {
      logger.info(`
      Method: ${method}
      Url: ${url}
      StatusCode: ${response.statusCode}
      Body: ${JSON.stringify(request.body)}
      Params: ${JSON.stringify(request.params)}
      Headers: ${JSON.stringify(request.headers, null, 12)}
      Time: [${Date.now() - start}ms] \n`);
    });

    next();
  }
}
