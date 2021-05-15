const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const { HttpError } = require('../../utils/error/httpError');

const getAll = () => boardRepo.getAll();

const get = async (id) => {
  const board = await boardRepo.get(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return board;
};

const create = ({ title, columns }) =>
  boardRepo.create(new Board({ title, columns }));

const updateBoard = (boardData, id) => boardRepo.updateBoard(boardData, id);

const deleteBoard = (id) => boardRepo.deleteBoard(id);

module.exports = { getAll, get, create, updateBoard, deleteBoard };
