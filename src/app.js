const createError = require('http-errors');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const HttpError = require('./utils/error/httpError');
const userRouter = require('./resources/users/user.router');
const boardsRouter = require('./resources/board/board.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(require('./middleware/sendHttpError'));

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

module.exports = app;

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send('error');
  }
});
