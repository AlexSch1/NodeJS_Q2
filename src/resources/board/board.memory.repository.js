const DB = require('../../common/DB');
const { HttpError } = require('../../utils/error/httpError');

/** This function get all Boards.
 * @return {Promise<Board[]>} - Array boards.
 * */
const getAll = () => DB.getAllBoards();

/** This function get Board by id.
 * @param {number} id - Board's id.
 * @return {Promise<Board>} - Board.
 * */
const get = (id) => DB.getBoard(id);

/** Create a new Board and return created Board.
 * @param {Board} board - A new Board.
 * @return {Promise<Board>} - Board.
 * */
const create = (board) => DB.createBoard(board);

/** Update a Board in DB and return updated Board.
 * @param {Object} boardData - New data for Board.
 * @param {number} id - Board id.
 * @return {Promise<Board>} - Board.
 * */
const updateBoard = (boardData, id) => DB.updateBoard(boardData, id);

/** Delete a Board in DB and return deleted Board or empty array.
 * @param {number} id - Board id.
 * @return {Promise<Board[]>} - Board.
 * */
const deleteBoard = async (id) => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new HttpError(404, 'Board not found');
  }

  return DB.deleteBoard(id);
};

module.exports = { getAll, get, create, updateBoard, deleteBoard };
