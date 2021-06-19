import { DeleteResult, getRepository } from 'typeorm';
// import { DB } from'../../common/DB';
import HttpError from '../../utils/error/httpError';
// import { Board } from '../../common/interfaces';
import { Board } from '../../entities/Board';
import { BoardDto } from '../../common/interfaces';
import { Task } from '../../entities/Task';

const getAll = (): Promise<Board[]> => {
  const rep = getRepository(Board);
  return rep.find({where: {}});
  // DB.getAllBoards()
};

const create = (board: BoardDto): Promise<Board> => {
  const rep = getRepository(Board);
  const newEntity = rep.create(board);
  return rep.save(newEntity);
  // DB.createBoard(board)
};

const get = async (id: string): Promise<Board | null> => {
  const rep = getRepository(Board);
  const res = await rep.findOne(id);

  if (!res) return null;

  return res;

  // DB.getBoard(id)
};

const updateBoard = async (boardData: Board, id: string): Promise<Board | null> => {
  const rep = getRepository(Board);
  const res = await rep.findOne(id);

  if (!res) return null;

  const updatedBoard = await rep.update(id, boardData);

  return updatedBoard.raw;

  // DB.updateBoard(boardData, id)
};

const deleteBoard = async (id: string): Promise<'DELETED'> => {
  const rep = getRepository(Board);
  const deletedBoard: DeleteResult = await rep.delete(id);
  if (deletedBoard.affected) {
    const tasksRepBuilder = getRepository(Task).createQueryBuilder();
    await tasksRepBuilder
      .delete()
      .from(Task)

      // .update(Task)
      // .set({ userId: null })
      .where("boardId = :boardId", { boardId: id })
      .execute();
    return 'DELETED';
  }


  throw new HttpError(404, 'Board not found');
  //
  //
  // const board: Board | null = await DB.getBoard(id);
  //
  // if (!board) {
  //   throw new HttpError(404, 'Board not found');
  // }
  //
  // return DB.deleteBoard(id);
};

export default {
  getAll, get, create, updateBoard, deleteBoard
}
