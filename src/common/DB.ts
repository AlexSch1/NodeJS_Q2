import { IBoard, ITask, IUser } from './interfaces';

import User from '../resources/users/user.model';

const USERS: IUser[] = [];
const BOARDS: IBoard[] = [];
let TASKS: ITask[] = [];

const getAllUsers = async (): Promise<IUser[]> => [...USERS];

const getUser = async (id: string): Promise<IUser | null> => {
  const userFromDB: IUser | undefined = USERS.find((user: IUser) => user.id === id);

  return userFromDB || null;
};

const createUser = async (user: IUser): Promise<IUser> => {
  USERS.push(user);
  return User.toResponse(user);
};

const updateUser = async (
  userInfo: IUser,
  id: string
): Promise<IUser | null> => {
  const user: IUser | null = await getUser(id);

  if (!user) {
    return null;
  }

  user.name = userInfo.name;
  user.login = userInfo.login;
  user.password = userInfo.password;

  return user;
};

const deleteUser = async (id: string): Promise<IUser[]> => {
  const index: number = USERS.findIndex((user) => user.id === id);
  TASKS = TASKS.map((task: ITask) => {
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

const getAllBoards = async (): Promise<IBoard[]> => [...BOARDS];

const getBoard = async (id: string): Promise<IBoard | null> => {
  const boardFromDB: IBoard | undefined = BOARDS.find((board) => board.id === id);
  return boardFromDB || null;
};

const createBoard = async (board: IBoard): Promise<IBoard> => {
  BOARDS.push(board);
  return board;
};

const updateBoard = async (
  boardData: IBoard,
  id: string
): Promise<IBoard | null> => {
  const board: IBoard | null = await getBoard(id);

  if (!board) {
    return null;
  }

  board.title = boardData.title;
  board.columns = boardData.columns;

  return board;
};

const deleteBoard = async (id: string): Promise<IBoard[]> => {
  const index: number = BOARDS.findIndex((board) => board.id === id);
  TASKS = TASKS.filter((task) => task.boardId !== id);
  return BOARDS.splice(+index, 1);
};

const createTask = async (taskData: ITask): Promise<ITask> => {
  TASKS.push(taskData);
  return taskData;
};

const getAll = async (boardId: string): Promise<ITask[]> =>
  TASKS.filter((task) => task.boardId === boardId).map((item) => item);

const getTask = async (taskId: string): Promise<ITask | null> => {
  const taskF: ITask | undefined = TASKS.find((task) => task.id === taskId);

  if (!taskF) {
    return null;
  }

  return taskF;
};

const updateTask = async (taskId: string, taskData: ITask): Promise<ITask | null> => {
  let newTask: ITask | null = null;
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

const deleteTask = async (taskId: string): Promise<ITask[]> => {
  const index: number = TASKS.findIndex((task) => task.id === taskId);
  return TASKS.splice(+index, 1);
};

export const DB = {
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
