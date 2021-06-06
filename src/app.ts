import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/board/board.router';
import loggerMiddleware from './middleware/loggerMiddleware';
import {
  getStatusText,
  INTERNAL_SERVER_ERROR,
} from 'http-status-codes/build/es';
// import sendHttpError from './middleware/sendHttpError'

const app: express.Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
app.use(express.json());
// app.use(sendHttpError());

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

app.use((_err, _req: express.Request, res: express.Response) => {
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

export default app;
