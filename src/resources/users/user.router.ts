import { Router, Request, Response } from 'express';
import passport from 'passport';
import { User } from '../../entities/User';
import usersService from './user.service';
import errorHandler from '../../utils/error/errorHandler';
import { IParams, StudentDto } from '../../common/interfaces';

const router = Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (_, res: Response) => {
      try {
        const users: User[] = await usersService.getAll();
        res.json(users);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/')
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response) => {
      try {
        const user: StudentDto | null = await usersService.create(req.body);
        if (user) {
          delete user.password;
          res.status(201).json(user);
          return;
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:userId')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { userId } = req.params;
      try {
        const user: StudentDto | null = await usersService.get(userId);
        if (!user) {
          res.status(404).send({ message: 'User not found' });
          return;
        }
        delete user.password;
        res.json(user);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:userId')
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { userId } = req.params;
      try {
        const user: User | null = await usersService.updateUser(
          req.body,
          userId
        );
        if (!user) {
          res.json(404);
        } else {
          res.json(user);
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:userId')
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { userId } = req.params;
      try {
        const result = await usersService.deleteUser(userId);
        if (result === 'DELETED') {
          res.status(204).json('The user has been deleted');
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

export default router;
