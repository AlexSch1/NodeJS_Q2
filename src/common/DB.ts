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


// import NotFoundError from '../errors/NotFoundError.js';
// import User, { IUser } from '../resources/users/user.model.js';
// import { IBoard } from '../resources/boards/board.model.js';
// import { ITask } from '../resources/tasks/task.model.js';
// import ForbiddenError from '../errors/ForbiddenError.js';
//
// type tableNames = "Users" | "Boards" | "Tasks";
// type tableTypes = IUser| IBoard | ITask | undefined;
//
// type memoryDb = {
//   [key in tableNames]: tableTypes[]
// }
//
// const db: memoryDb = {
//   Users: [ new User() ],
//   Boards: [],
//   Tasks: []
// };
//
// /**
//  * Gets all entities from the table in the database
//  * @param {string} tableName The name of the table in the database
//  * @returns {Object[]} Array of entities
//  */
// const getAllEntities = (tableName: tableNames): tableTypes[] => db[tableName];
//
// /**
//  * Gets the entity from the database
//  * @param {string} tableName The name of the table in the database
//  * @param {string} id Id of the entity
//  * @returns {Object} The entity from the database
//  */
// const getEntity = (tableName: tableNames, id: string): tableTypes => {
//   const entity = db[tableName].filter((item) => item?.id === id);
//   if (!entity.length) {
//     throw new NotFoundError(`Entity ${id} was not found`);
//   }
//   return entity[0];
// }
//
// /**
//  * Adds an entity to the table in the database
//  * @param {string} tableName The name of the table in the database
//  * @param {Object} entity New entity
//  * @returns {Object} The added entity from the database
//  */
// const addEntity = (tableName: tableNames, entity: tableTypes): tableTypes => {
//   if(!entity) return entity;
//
//   db[tableName].push(entity);
//
//   return getEntity(tableName, entity.id);
// }
//
// /**
//  * Deletes the entity from the table in the database
//  * @param {string} tableName The name of the table in the database
//  * @param {string} id Id of the entity
//  * @returns {boolean} Check that deletion was done
//  */
// const deleteEntity = (tableName: tableNames, id: string): boolean => {
//   const index = db[tableName].findIndex((item) => item?.id === id);
//   if (index >= 0){
//     db[tableName].splice(index, 1);
//   };
//   return true;
// };
//
// /**
//  * Updates the entity in the table in the database
//  * @param {string} tableName The name of the table in the database
//  * @param {string} id Id of the entity
//  * @param {Object} entity The updated entity
//  * @returns {Object} The updated entity from the database
//  */
// const updateEntity = (tableName: tableNames, id: string, entity: tableTypes): tableTypes => {
//   if(!entity) return entity;
//
//   const index = db[tableName].findIndex((item) => item?.id === id);
//   if (index >= 0){
//     const updEntity = entity;
//     updEntity.id = id;
//
//     db[tableName][index] = updEntity;
//   };
//
//   return getEntity(tableName, id);
// }
//
// /**
//  * Deletes all tasks for the board
//  * @param {string} boardId BoardId of the entity
//  * @returns {boolean} Check that deletion was done
//  */
// const deleteTasksByBoardId = (boardId: string): boolean => {
//   db.Tasks = db.Tasks.filter((item) => (item as ITask).boardId !== boardId);
//   return true;
// }
//
// /**
//  * Updates userId field to null
//  * @param {string} userId UserId of the entity
//  */
// const unassignTasksUser = (userId: string) => {
//   db.Tasks.forEach((item, index) => {
//     if ((item as ITask).userId === userId) {
//       (db.Tasks[index] as ITask).userId = null;
//     }
//   });
// }
//
// /**
//  * Gets user by login
//  * @param {string} login User login
//  */
// const getUserByLogin = (login: string): IUser => {
//   const user = db.Users.find((item) => (item as IUser).login === login);
//   if (!user) {
//     throw new ForbiddenError("User was not found!")
//   }
//   return user as IUser;
// }
//
// /**
//  * InMemory database implemenation
//  * @module db/inMemoryDb
//  */
// export { addEntity, deleteEntity, deleteTasksByBoardId, getAllEntities, getEntity, updateEntity, unassignTasksUser, getUserByLogin }
