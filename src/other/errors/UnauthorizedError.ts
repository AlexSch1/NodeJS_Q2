import statusCodes from 'http-status-codes';
/** Class representing a Unauthorized Error
 * @extends Error
 */
class UnauthorizedError extends Error {
    status: number;

    /**
     * UnauthorizedError constructor
     * @param {string} message Error message
     */
    constructor(message = 'Unauthorized') {
      super(message);
      this.status = statusCodes.UNAUTHORIZED;
    }
}

/**
 * Wrapper for Unauthorized Error
 * @module errors/UnauthorizedError
 */
export default UnauthorizedError;