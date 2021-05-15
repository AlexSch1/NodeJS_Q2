const User = require('../resources/users/user.model');
const Board = require('../resources/board/board.model');
const Task = require('../resources/task/task.model');

const USERS = [new User(), new User()];
const BOARDS = [new Board(), new Board()];
let TASKS = [];

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
  TASKS = TASKS.filter((task) => task.boardId !== id);
  // console.log(TASKS);
  return BOARDS.splice(+index, 1);
};

/*
 * TASKS
 * */
const createTask = async (taskData) => {
  TASKS.push(taskData);
  return taskData;
};

const getAll = async (boardId) =>
  TASKS.filter((task) => task.boardId === boardId).map((item) =>
    Task.toResponse(item)
  );

const getTask = async (boardId, taskId) => {
  const taskF = TASKS.find((task) => task.id === taskId);
  return taskF;
};

const updateTask = async (boardId, taskId, taskData) => {
  let newTask;
  TASKS = TASKS.map((task) => {
    if (task.id === taskId) {
      newTask = {
        ...task,
        id: taskData.id,
      };
      return newTask;
    } 
      return task;
    
  });
  return newTask;
};

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
