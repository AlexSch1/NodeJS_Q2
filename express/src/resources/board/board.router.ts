import { Router, Request, Response } from 'express';
import passport from 'passport';
import { IParams } from '../../common/interfaces';

import boardService from './board.service';
import errorHandler from '../../utils/error/errorHandler';
import tasksRouter from '../task/task.router';
import { Board } from '../../entities/Board';
import { User } from '../../entities/User';

const router = Router();

router
  .route('/')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (_, res: Response) => {
      try {
        const boards: Board[] = await boardService.getAll();
        res.json(boards);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { boardId } = req.params;
      try {
        const board: Board | null = await boardService.get(boardId);
        if (!board) {
          res.status(404).send({ message: 'BoardEntity not found' });
          return;
        }
        res.json(board);
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
        const board: Board | null = await boardService.create(req.body);
        res.status(201).json(board);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId')
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { boardId } = req.params;
      try {
        const board: Board | null = await boardService.updateBoard(
          req.body,
          boardId
        );
        if (!board) {
          res.json(404);
        } else {
          res.json(User);
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId')
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { boardId } = req.params;
      try {
        const result = await boardService.deleteBoard(boardId);
        if (result === 'DELETED') {
          res.status(204).json('The board has been deleted');
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router.use('/', tasksRouter);

export default router;
