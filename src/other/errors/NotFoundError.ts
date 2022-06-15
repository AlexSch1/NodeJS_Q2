import statusCodes from 'http-status-codes';
/** Class representing a NotFound Error
 * @extends Error
 */
class NotFoundError extends Error {
    status: number;

    /**
     * NotFoundError constructor
     * @param {string} message Error message
     */
    constructor(message = 'Not found') {
      super(message);
      this.status = statusCodes.NOT_FOUND;
    }
}

/**
 * Wrapper for NotFound Error
 * @module errors/NotFoundError
 */
export default NotFoundError;