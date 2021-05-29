const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const { HttpError } = require('../../utils/error/httpError');

/** This function get all Boards.
 * @return {Promise<Board[]>} - Array boards.
 * */
const getAll = () => boardRepo.getAll();

/** This function get Board by id.
 * @param {number} id - Board's id.
 * @return {Promise<Board>} - Board.
 * */
const get = async (id) => {
  const board = await boardRepo.get(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return board;
};

/** Create a new Board and return created Board.
 * @param {Object} obj - Data for new Board.
 * @param {string} obj.title - Title for new Board.
 * @param {array} obj.columns - Columns for new Board.
 * @return {Promise<Board>} - Board.
 * */
const create = ({ title, columns }) =>
  boardRepo.create(new Board({ title, columns }));

/** Update a Board in DB and return updated Board.
 * @param {Object} boardData - New data for Board.
 * @param {number} id - Board id.
 * @return {Promise<Board>} - Board.
 * */
const updateBoard = (boardData, id) => boardRepo.updateBoard(boardData, id);

/** Delete a Board in DB and return deleted Board or empty array.
 * @param {number} id - Board id.
 * @return {Promise<Board[]>} - Promise array with deleted Board or empty array.
 * */
const deleteBoard = (id) => boardRepo.deleteBoard(id);

module.exports = { getAll, get, create, updateBoard, deleteBoard };
