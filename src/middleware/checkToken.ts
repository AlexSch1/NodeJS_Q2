import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/config';

export default (
  request: express.Request,
  response: express.Response,
  next: NextFunction
): void => {
  const token = request.headers['authorization'];
  // console.log(request.headers);
  console.log('__________', token);
  if (token) {
    // @ts-ignore
    jwt.verify(
      token,
      config.JWT_SECRET_KEY,
      function (err, _decoded) {
        if (err) {
          response.status(401).json('Failed to authenticate token.');
          return;
        }
        console.log('__________', _decoded);
      }
    );
  } else {
    response.status(401).json('Failed to authenticate token.');
    // next()
    return;
  }

  next();
};
