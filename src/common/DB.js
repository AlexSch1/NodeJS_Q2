const User = require('../resources/users/user.model');

/**
 * @const {Array<User>}
 * */
const USERS = [];

/**
 * @const {Array<Board>}
 * */
const BOARDS = [];

/**
 * @let {Array<TASKS>}
 * */
let TASKS = [];

/** This function get all users.
 * @return {Promise<User[]>} - Array users.
 * */
const getAllUsers = async () => [...USERS];

/** This function get user by id.
 * @param {number} id - User's id.
 * @return {Promise<User>} - User.
 * */
const getUser = async (id) => USERS.find((user) => user.id === id);

/** Create a new User and return created User.
 * @param {User} user - A new User.
 * @return {Promise<Object>} - Promise User without id.
 * */
const createUser = async (user) => {
  USERS.push(user);
  return User.toResponse(user);
};

/** Update a User in DB and return updated User.
 * @param {Object} userInfo - New data for User.
 * @param {number} id - User id.
 * @return {Promise<User>} - Promise updated User.
 * */
const updateUser = async (userInfo, id) => {
  const user = await getUser(id);

  user.name = userInfo.name;
  user.login = userInfo.login;
  user.password = userInfo.password;

  return user;
};

/** Delete a User in DB and return deleted User or empty array.
 * @param {number} id - User id.
 * @return {Promise<User[]>} - Promise array with deleted User or empty array.
 * */
const deleteUser = async (id) => {
  const index = USERS.findIndex((user) => user.id === id);
  TASKS = TASKS.map((task) => {
    if (task.userId === id) {
      return {
        ...task,
        userId: null,
      };
    }
    return task;
  });
  return USERS.splice(+index, 1);
};

/** This function get all Boards.
 * @return {Promise<Board[]>} - Array boards.
 * */
const getAllBoards = async () => [...BOARDS];

/** This function get Board by id.
 * @param {number} id - Board's id.
 * @return {Promise<Board>} - Board.
 * */
const getBoard = async (id) => BOARDS.find((board) => board.id === id);

/** This function save a new Board to DB and return this new Board.
 * @param {Board} board - A new Board.
 * @return {Promise<Board>} - Board.
 * */
const createBoard = async (board) => {
  BOARDS.push(board);
  return board;
};

/** Update a Board in DB and return updated Board.
 * @param {Object} boardData - New data for Board.
 * @param {number} id - Board id.
 * @return {Promise<Board>} - Board.
 * */
const updateBoard = async (boardData, id) => {
  const board = await getBoard(id);

  board.title = boardData.title;
  board.columns = boardData.columns;

  return board;
};

/** Delete a Board in DB and return deleted Board or empty array.
 * @param {number} id - Board id.
 * @return {Promise<Board[]>} - Board.
 * */
const deleteBoard = async (id) => {
  const index = BOARDS.findIndex((board) => board.id === id);
  TASKS = TASKS.filter((task) => task.boardId !== id);
  return BOARDS.splice(+index, 1);
};

/** Create a new Task in Board.
 * @param {Task} taskData - A new Task.
 * @return {Promise<Task>} - Promise a new Task.
 * */
const createTask = async (taskData) => {
  TASKS.push(taskData);
  return taskData;
};

/** This function get all Tasks in Board by Board id.
 * @return {Promise<Task[]>} - Promise Array Tasks.
 * */
const getAll = async (boardId) =>
  TASKS.filter((task) => task.boardId === boardId).map((item) => item);

/** This function get Task by id Task and Brand id.
 * @param {number} boardId - Board's id.
 * @param {number} taskId - Tasks's id.
 * @return {Promise<Task[]>} - Promise Tasks.
 * */
const getTask = async (boardId, taskId) => {
  const taskF = TASKS.find((task) => task.id === taskId);
  return taskF;
};

/** Update a Task in DB and return updated Task.
 * @param {number} boardId - Board id.
 * @param {number} taskId - Task id.
 * @param {object} taskData - New data for Task.
 * @return {Promise<Task>} - Promise updatedTask.
 * */
const updateTask = async (boardId, taskId, taskData) => {
  let newTask;
  TASKS = TASKS.map((task) => {
    if (task.id === taskId) {
      newTask = {
        ...taskData,
        id: taskData.id,
      };
      return newTask;
    }
    return task;
  });
  return newTask;
};

/** Delete a Task in DB and return deleted Task or empty array.
 * @param {number} boardId - Board id.
 * @param {number} taskId - Task id.
 * @return {Promise<Task[]>} - Promise array with deleted Task or empty array.
 * */
const deleteTask = async (boardId, taskId) => {
  const index = TASKS.findIndex((task) => task.id === taskId);
  return TASKS.splice(+index, 1);
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
  createTask,
  getAll,
  getTask,
  updateTask,
  deleteTask,
};
