const DB = require('../../common/DB');
const { HttpError } = require('../../utils/error/httpError');

const getAll = () => DB.getAllBoards();

const get = (id) => DB.getBoard(id);

const create = (board) => DB.createBoard(board);

const updateBoard = (boardData, id) => DB.updateBoard(boardData, id);

const deleteBoard = async (id) => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return DB.deleteBoard(id);
};

module.exports = { getAll, get, create, updateBoard, deleteBoard };
