import boardRepo from './board.memory.repository';
import HttpError from '../../utils/error/httpError';
import { Board } from '../../entities/Board';
import { BoardDto } from '../../common/interfaces';

const getAll = (): Promise<Board[]> => boardRepo.getAll();

const get = async (id: string): Promise<Board> => {
  const board = await boardRepo.get(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return board;
};

const create = ({ title, columns }: BoardDto): Promise<Board> =>
  boardRepo.create({ title, columns });

const updateBoard = (boardData: Board, id: string): Promise<Board | null> =>
  boardRepo.updateBoard(boardData, id);

const deleteBoard = (id: string): Promise<'DELETED'> =>
  boardRepo.deleteBoard(id);

export default { getAll, get, create, updateBoard, deleteBoard };
