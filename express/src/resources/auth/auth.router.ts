import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import authService from './auth.service';
import errorHandler from '../../utils/error/errorHandler';
import config from '../../common/config';

const router = Router();

router.route('/').post(async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const user = await authService.login(login, password);
    if (!user) {
      res.status(403).json({
        message: 'Forbidden',
      });
      return;
    }

    if (user === 403) {
      res.status(401).json({
        message: 'Incorrect email or password',
      });
      return;
    }

    const token = jwt.sign(
      {
        login: user.login,
        userId: user.id,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 * 60 * 60 }
    );

    res.status(200).json({
      token,
    });
  } catch (e) {
    errorHandler(res, e);
  }
});

export default router;
