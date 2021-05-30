import boardRepo from'./board.memory.repository';
import Board from'./board.model';
import HttpError from '../../utils/error/httpError';
import { IBoard } from '../../common/interfaces';

const getAll = (): Promise<IBoard[]> => boardRepo.getAll();

const get = async (id: string): Promise<IBoard> => {
  const board = await boardRepo.get(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return board;
};

const create = ({ title, columns }: IBoard): Promise<IBoard> =>
  boardRepo.create(new Board({ title, columns }));

const updateBoard = (boardData: IBoard, id: string): Promise<IBoard | null> => boardRepo.updateBoard(boardData, id);

const deleteBoard = (id: string): Promise<IBoard[]> => boardRepo.deleteBoard(id);

export default { getAll, get, create, updateBoard, deleteBoard };
