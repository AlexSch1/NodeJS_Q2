import { Router, Request, Response } from 'express';
import User from './user.model';
import usersService from './user.service';
import errorHandler from '../../utils/error/errorHandler';
import { IParams, IUser } from '../../common/interfaces';

const router = Router();

router.route('/').get(async (_, res: Response) => {
  try {
    const users: IUser[] = await usersService.getAll();
    // toResponse can move to service
    res.json(users.map(User.toResponse));
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const user: IUser| null = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').get(async (req: Request<IParams>, res: Response) => {
  const { userId } = req.params;
  try {
    const user: IUser = await usersService.get(userId);
    res.json(User.toResponse(user));
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').put(async (req: Request<IParams>, res: Response) => {
  const { userId } = req.params;
  try {
    const user: IUser | null = await usersService.updateUser(
      req.body,
      userId
    );
    if (!user) {
      res.json(404);
    } else {
      res.json(User.toResponse(user));
    }
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').delete(async (req: Request<IParams>, res: Response) => {
  const { userId } = req.params;
  try {
    await usersService.deleteUser(userId);
    res.status(204).json('The user has been deleted');
  } catch (e) {
    errorHandler(res, e);
  }
});

export default router;
