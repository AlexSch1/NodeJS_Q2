import { Router, Request, Response } from 'express';
// import User from './user.model';
import { User } from '../../entities/User';
import usersService from './user.service';
import errorHandler from '../../utils/error/errorHandler';
import { IParams } from '../../common/interfaces';
// import HttpError from '../../utils/error/httpError';

const router = Router();

router.route('/').get(async (_, res: Response) => {
  try {
    const users: User[] = await usersService.getAll();
    res.json(users);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const user: User | null = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').get(async (req: Request<IParams>, res: Response) => {
  const { userId } = req.params;
  try {
    const user: User | null = await usersService.get(userId);
    if (!user) {
      res.status(404).send({ message: 'User not found'});
      return;
    }
    res.json(User);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').put(async (req: Request<IParams>, res: Response) => {
  const { userId } = req.params;
  try {
    const user: User | null = await usersService.updateUser(
      req.body,
      userId
    );
    if (!user) {
      res.json(404);
    } else {
      res.json(User);
    }
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').delete(async (req: Request<IParams>, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await usersService.deleteUser(userId);
    if (result === 'DELETED') {
      res.status(204).json('The user has been deleted');
    }
  } catch (e) {
    errorHandler(res, e);
  }
});

export default router;
