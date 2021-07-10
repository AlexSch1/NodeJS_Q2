import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import passport from 'passport';
import userRouter from './resources/users/user.router';
import authRouter from './resources/auth/auth.router';
import boardsRouter from './resources/board/board.router';
import loggerMiddleware from './middleware/loggerMiddleware';
import Logger from './utils/Logger';
import passportMiddleware from './middleware/passport';

const logger = new Logger();
const app: express.Application = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(loggerMiddleware);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
//
app.use(passport.initialize());
passportMiddleware(passport);

app.use('/login', authRouter);
app.use('/users', userRouter);
app.use('/boards', boardsRouter);

app.use(
  (
    _err: express.ErrorRequestHandler,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
    next();
  }
);

process.on('uncaughtException', (error: Error) => {
  logger.error(error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error(reason.message);
  process.exit(1);
});

export default app;
