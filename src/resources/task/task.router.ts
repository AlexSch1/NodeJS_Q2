import { Router, Request, Response } from 'express';
import { IParams } from '../../common/interfaces';
import taskService from './task.service';
import errorHandler from '../../utils/error/errorHandler';
import { Task } from '../../entities/Task';
import passport from 'passport';

const router = Router();

router
  .route('/:boardId/tasks')
  .post(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { boardId } = req.params;
      try {
        const task: Task = await taskService.create(req.body, boardId);
        res.status(201).json(task);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId/tasks')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { boardId } = req.params;
      try {
        const tasks: Task[] = await taskService.getAll(boardId);
        res.status(200).json(tasks);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId/tasks/:taskId')
  .get(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { taskId } = req.params;
      try {
        const task: Task | null = await taskService.getTask(taskId);
        if (!task) {
          res.status(404).json('Task not found');
          return;
        }
        res.status(200).json(task);
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId/tasks/:taskId')
  .put(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { taskId } = req.params;
      try {
        const task: Task | null = await taskService.updateTask(
          taskId,
          req.body
        );
        if (!task) {
          res.json(404);
        } else {
          res.json(task);
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

router
  .route('/:boardId/tasks/:taskId')
  .delete(
    passport.authenticate('jwt', { session: false }),
    async (req: Request<IParams>, res: Response) => {
      const { taskId } = req.params;
      try {
        const result = await taskService.deleteTask(taskId);
        if (result === 'DELETED') {
          res.status(204).json('The task has been deleted');
        }
      } catch (e) {
        errorHandler(res, e);
      }
    }
  );

export default router;
