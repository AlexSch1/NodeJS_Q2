const DB = require('../../common/DB');
const { HttpError } = require('../../utils/error/httpError');

const create = (task) => DB.createTask(task);
const getAll = (boardId) => DB.getAll(boardId);
const getTask = (boardId, taskId) => DB.getTask(boardId, taskId);
const updateTask = async (boardId, taskId, taskData) => {
  const task = await DB.getTask(boardId, taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return DB.updateTask(boardId, taskId, taskData);
};

const deleteTask = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return DB.deleteTask(boardId, taskId);
};

module.exports = { create, getAll, getTask, updateTask, deleteTask };
