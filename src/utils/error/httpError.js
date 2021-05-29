const util = require('util');
const http = require('http');

/**
 * Class HttpError for errors
 * @constructor
 * @param {string} status - Status code.
 * @param {string} message - Message error.
 * @param {...args} args - Other args.
 * */
function HttpError(status, message, ...args) {
  Error.apply(this, args);
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status];
}

util.inherits(HttpError, Error);

/**
 * Name class.
 */
HttpError.prototype.name = 'HttpError';

exports.HttpError = HttpError;
