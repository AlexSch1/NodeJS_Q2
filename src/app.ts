import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import userRouter from './resources/users/user.router';
import boardsRouter from './resources/board/board.router';
import loggerMiddleware from './middleware/loggerMiddleware';
import Logger from './utils/Logger';

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

app.use('/users', userRouter);
app.use('/boards', boardsRouter);


app.use((_err, _req: express.Request, res: express.Response) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  });
});

process.on('uncaughtException', (error: Error) => {
  logger.error(error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.error(reason.message);
  process.exit(1);
});


// app.use(errorHandle);
// process.on('uncaughtException', exceptionHandler);
// process.on('unhandledRejection', promiseErrorHandler);


export default app;


// import { appendFile } from 'fs';
//
// const UNCAUGHT_EXCEPTION_EXIT = 1;
// const UNHANDLED_REJECTION_EXIT = 2;
//
// export const logger = (
//   message: string,
//   logLevel = 'general'
// ): Promise<void> => {
//   const fileName = `${logLevel}.txt`;
//   const preparedMessage = `${new Date().toISOString()}: ${message}\n\n`;
//
//   return new Promise((resolve: () => void) =>
//     appendFile(
//       fileName,
//       preparedMessage,
//       (error: NodeJS.ErrnoException | null): void => {
//         if (error) {
//           console.error(
//             `Fail save log [${preparedMessage}] to file [${logLevel}] with reason: ${error}`
//           );
//         }
//         resolve();
//       }
//     )
//   );
// };
//
// export const errorToText = (error: Error): string =>
//   error.stack ?? String(error.message ? error.message : error);
//
// export const exceptionHandler = (error: Error, origin: string): void => {
//   const message = `${origin}: ${errorToText(error)}`;
//
//   logger(message, 'error').finally(() => process.exit(UNCAUGHT_EXCEPTION_EXIT));
// };
//
// export const promiseErrorHandler = (reason: Error): void => {
//   const message = `Unhandled Rejection with reason: ${errorToText(reason)}`;
//
//   logger(message, 'error').finally(() =>
//     process.exit(UNHANDLED_REJECTION_EXIT)
//   );
// };

//
// export const errorHandle = (
//   err: Error,
//   _req: Request,
//   res: Response,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   _next: NextFunction
// ): void => {
//   logger(errorToText(err), 'error');
//
//   res.status(HTTP_STATUS.SERVER_ERROR).end('Service temporally unavailable');
// };
