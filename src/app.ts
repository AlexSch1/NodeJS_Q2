// import createError from 'http-errors';
import express, { NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import YAML from 'yamljs';
// import HttpError from './utils/error/httpError';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/board/board.router';
import { finished } from 'stream';
// import sendHttpError from './middleware/sendHttpError'

const app: express.Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
// app.use(sendHttpError());

function loggerMiddleware(request: express.Request, response: express.Response, next: NextFunction) {
  const { method, url } = request;
  const start = Date.now();

  next();

  finished(response, () => {
    const data = `${method} ${url} [${ Date.now() - start }ms] \n`;
    fs.appendFile('log.txt', data, (e) => {
      if (e) {
        console.error(e);
      }
    })
  });
}


app.use(loggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardsRouter);

// app.use((_, __, next: NextFunction) => {
//   next(createError(404));
// });

// app.use((err, req: Request, res: Response) => {
//   if (err instanceof HttpError) {
//     // res.sendHttpError(err);
//     res.send('error');
//   } else {
//     // res.locals['message'] = err.message;
//     res.locals['error'] = req.app.get('env') === 'development' ? err : {};
//
//     // res.status(err.status || 500);
//     res.send('error');
//   }
// });

export default app;
