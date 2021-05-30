import { DB } from'../../common/DB';
import HttpError from '../../utils/error/httpError';
import { IBoard } from '../../common/interfaces';

const getAll = (): Promise<IBoard[]> => DB.getAllBoards();

const get = (id: string): Promise<IBoard | null> => DB.getBoard(id);

const create = (board: IBoard): Promise<IBoard> => DB.createBoard(board);

const updateBoard = (boardData: IBoard, id: string): Promise<IBoard | null> => DB.updateBoard(boardData, id);

const deleteBoard = async (id: string): Promise<IBoard[]> => {
  const board: IBoard | null = await DB.getBoard(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return DB.deleteBoard(id);
};

export default {
  getAll, get, create, updateBoard, deleteBoard
}
