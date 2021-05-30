import { Response } from 'express';

interface IError {
  status: number;
  message: string
}

export default <T extends IError>(res: Response, error: T): void => {
  res.status(error.status || 500).json({
    success: false,
    message: error.message || error,
  });
};
