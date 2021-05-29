const taskRepo = require('./task.memory.repository');
const Task = require('./task.model');


/** This function get all Tasks in Board id.
 * @return {Promise<Task[]>} - Promise Array Tasks.
 * */
const getAll = (boardId) => taskRepo.getAll(boardId);

/** This function get Task by id Task and Brand id.
 * @param {number} boardId - Board's id.
 * @param {number} taskId - Tasks's id.
 * @return {Promise<Task>} - Promise Task.
 * */
const getTask = (boardId, taskId) => taskRepo.getTask(boardId, taskId);

/** Create a new Task in Board.
 * @param {Object} task - Data a new Task.
 * @param {number} boardId - Board id.
 * @return {Promise<Task>} - Promise a new Task.
 * */
const create = (task, boardId) =>
  taskRepo.create(new Task({ ...task, boardId }));

/** Update a Task in DB and return updated Task.
 * @param {number} boardId - Board id.
 * @param {number} taskId - Task id.
 * @param {object} taskData - New data for Task.
 * @return {Promise<Task>} - Promise Task.
 * */
const updateTask = (boardId, taskId, taskData) =>
  taskRepo.updateTask(boardId, taskId, taskData);

/** Delete a Task in DB and return deleted Task or empty array.
 * @param {number} boardId - Board id.
 * @param {number} taskId - Task id.
 * @return {Promise<Task[]>} - Promise array with deleted Task or empty array.
 * */
const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);

module.exports = { create, getAll, getTask, updateTask, deleteTask };
