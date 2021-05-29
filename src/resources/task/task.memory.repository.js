const DB = require('../../common/DB');
const { HttpError } = require('../../utils/error/httpError');

/** Create a new Task in Board.
 * @param {Object} task - Data a new Task.
 * @param {number} boardId - Board id.
 * @return {Promise<Task>} - Promise a new Task.
 * */
const create = (task) => DB.createTask(task);

/** This function get all Tasks in Board.
 * @return {Promise<Task[]>} - Promise Array Tasks.
 * */
const getAll = (boardId) => DB.getAll(boardId);

/** This function get Task by id Task and Brand id.
 * @param {number} boardId - Board's id.
 * @param {number} taskId - Tasks's id.
 * @return {Promise<Task>} - Promise Task.
 * */
const getTask = (boardId, taskId) => DB.getTask(boardId, taskId);

/** Update a Task in DB.
 * @param {number} boardId - Board id.
 * @param {number} taskId - Task id.
 * @param {object} taskData - New data for Task.
 * @return {Promise<Task>} - Promise Task.
 * */
const updateTask = async (boardId, taskId, taskData) => {
  const task = await DB.getTask(boardId, taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return DB.updateTask(boardId, taskId, taskData);
};

/** Delete a Task in DB and return deleted Task or empty array.
 * @param {number} boardId - Board id.
 * @param {number} taskId - Task id.
 * @return {Promise<Task[]>} - Promise array with deleted Task or empty array.
 * */
const deleteTask = async (boardId, taskId) => {
  const task = await DB.getTask(boardId, taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return DB.deleteTask(boardId, taskId);
};

module.exports = { create, getAll, getTask, updateTask, deleteTask };
