import statusCodes from 'http-status-codes';
/** Class representing a Forbidden Error
 * @extends Error
 */
class ForbiddenError extends Error {
    status: number;

    /**
     * ForbiddenError constructor
     * @param {string} message Error message
     */
    constructor(message = 'Forbidden') {
      super(message);
      this.status = statusCodes.FORBIDDEN;
    }
}

/**
 * Wrapper for Forbidden Error
 * @module errors/ForbiddenError
 */
export default ForbiddenError;