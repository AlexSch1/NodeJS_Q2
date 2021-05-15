const User = require('../resources/users/user.model');
const Board = require('../resources/board/board.model');

const USERS = [new User(), new User()];
const BOARDS = [new Board(), new Board()];

/*
* USERS
* */
const getAllUsers = async () => [...USERS];

const getUser = async (id) => USERS.find((user) => user.id === id);

const createUser = async (user) => {
  USERS.push(user);
  return User.toResponse(user);
};

const updateUser = async (userInfo, id) => {
  const user = await getUser(id);

  user.name = userInfo.name;
  user.login = userInfo.login;
  user.password = userInfo.password;

  return user;
};

const deleteUser = async (id) => {
  const index = USERS.findIndex((user) => user.id === id);
  return USERS.splice(+index, 1);
};

/*
* BOARDS
* */

const getAllBoards = async () => [...BOARDS];

const getBoard = async (id) => BOARDS.find((board) => board.id === id);

const createBoard = async (board) => {
  BOARDS.push(board);
  return board;
};

const updateBoard = async (boardData, id) => {
  const board = await getBoard(id);

  board.title = boardData.title;
  board.columns = boardData.columns;

  return board;
};

const deleteBoard = async (id) => {
  const index = BOARDS.findIndex((board) => board.id === id);
  return BOARDS.splice(+index, 1);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
