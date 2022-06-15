import { NextFunction, Request, Response } from "express";

/**
 * Wrapper for async functions
 * @param {Function} fn wrapped function
 */
const wrapAsync = (fn: Function) => (req:Request, res:Response, next:NextFunction) => {
    fn(req, res, next).catch(next);
};

/**
 * Wrapper for async functions
 * @module errors/wrapAsync
 */
export default wrapAsync;