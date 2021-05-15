const util = require('util');
const http = require('http');

function HttpError(status, message, ...args) {
  Error.apply(this, args);
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status];
}

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;