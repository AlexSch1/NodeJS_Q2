import express, { NextFunction } from 'express';
import { finished } from 'stream';
import fs from 'fs';

export default (
  request: express.Request,
  response: express.Response,
  next: NextFunction
) => {
  const { method, url } = request;
  const start = Date.now();

  next();

  finished(response, () => {
    const data = `
      Method: ${method}
      Url: ${url}
      StatusCode: ${response.statusCode}
      Body: ${JSON.stringify(request.body)}
      Params: ${JSON.stringify(request.params)}
      Time: [${Date.now() - start}ms] \n`;
    fs.appendFile('log.txt', data, (e) => {
      if (e) {
        console.error(e);
      }
    });
  });
};
