// import { Request, NextFunction } from 'express';
// import HttpError from '../utils/error/httpError';
// import { IError } from '../common/interfaces';
//
// export default (req: Request, res: IError, next: NextFunction): void => {
//     res.sendHttpError = (error: HttpError) => {
//         res.status(error.status);
//
//         if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
//             res.json(error);
//         } else {
//             res.render('error', {error});
//         }
//     }
//
//     next();
// }
