import { Router, Request, Response } from 'express';
import { IBoard, IParams } from '../../common/interfaces';

import boardService from './board.service';
import errorHandler from '../../utils/error/errorHandler';
import tasksRouter from '../task/task.router';

const router = Router();

router.route('/').get(async (_, res: Response) => {
  try {
    const boards: IBoard[] = await boardService.getAll();
    res.json(boards);
  } catch (e) {
    errorHandler(res, e);
  }
});



router.route('/:boardId').get(async (req: Request<IParams>, res: Response) => {
  const {boardId} = req.params;
  try {
    const board: IBoard = await boardService.get(boardId);
    res.json(board);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const board: IBoard = await boardService.create(req.body);
    res.status(201).json(board);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId').put(async (req: Request<IParams>, res: Response) => {
  const { boardId } = req.params;
  try {
    const board: IBoard | null = await boardService.updateBoard(
      req.body,
      boardId
    );
    res.json(board);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId').delete(async (req: Request<IParams>, res: Response) => {
  const { boardId } = req.params;
  try {
    await boardService.deleteBoard(boardId);
    res.status(200).send('The board has been deleted');
  } catch (e) {
    errorHandler(res, e);
  }
});

router.use('/', tasksRouter);

export default router;
