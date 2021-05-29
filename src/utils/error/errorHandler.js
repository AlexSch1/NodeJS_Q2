/**
 * Error handler.
 * @module utils/error
 */

/**
 * Function error handler
 * @param {*} res - Response.
 * @param {*} error - Some error.
 */
module.exports = (res, error) => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || error,
  });
};
