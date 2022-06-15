import { NextFunction, Request, Response } from "express";
import statusCodes from 'http-status-codes';

import logger from "../logger/logger.js";
import ForbiddenError from "./ForbiddenError.js";
import notFoundError from './NotFoundError.js';
import UnauthorizedError from "./UnauthorizedError.js";

/** use like middleware
 * Function for error handling
 * @param {Error} err Error
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Function} next Next
 */
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {        
        if (err instanceof notFoundError ||
            err instanceof UnauthorizedError ||
            err instanceof ForbiddenError) {
            res.status(err.status).send(err.message);
        } else {
            res.sendStatus(statusCodes.INTERNAL_SERVER_ERROR);
        }

        const { protocol, method, originalUrl, body, query } = req;
        logger.error(`Request ${protocol} ${method} ${originalUrl}, body: ${JSON.stringify(body)}, query parameters: ${JSON.stringify(query)} responded with status ${res.statusCode}`);
    }  
    next();
};

/**
 * Wrapper for error handling
 * @module errors/errorHandler
 */
export default errorHandler;