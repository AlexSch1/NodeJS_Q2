import { Router, Request, Response } from 'express';
import { IParams, ITask } from '../../common/interfaces';
import taskService from'./task.service';
import errorHandler from '../../utils/error/errorHandler';

const router = Router();

router.route('/:boardId/tasks').post(async (req: Request<IParams>, res: Response) => {
  const {boardId} = req.params;
  try {
    const task: ITask = await taskService.create(req.body, boardId);
    res.status(201).json(task);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId/tasks').get(async (req: Request<IParams>, res: Response) => {
  const {boardId} = req.params;
  try {
    const tasks: ITask[] = await taskService.getAll(boardId);
    res.status(200).json(tasks);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req: Request<IParams>, res: Response) => {
  const {taskId} = req.params;
  try {
    const task: ITask | null = await taskService.getTask(
      taskId
    );
    if (!task) {
      res.status(404).json('Task not found');
    }
    res.status(200).json(task);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req: Request<IParams>, res: Response) => {
  const {taskId} = req.params;
  try {
    const task: ITask | null = await taskService.updateTask(
      taskId,
      req.body
    );
    res.status(200).json(task);
  } catch (e) {
    errorHandler(res, e);
  }
});
router.route('/:boardId/tasks/:taskId').delete(async (req: Request<IParams>, res: Response) => {
  const {taskId} = req.params;
  try {
    await taskService.deleteTask(taskId);
    res.status(200).json('The task has been deleted');
  } catch (e) {
    errorHandler(res, e);
  }
});

export default router;
