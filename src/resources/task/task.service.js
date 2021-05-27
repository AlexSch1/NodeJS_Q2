const taskRepo = require('./task.memory.repository');
const Task = require('./task.model');

const create = (task, boardId) =>
  taskRepo.create(new Task({ ...task, boardId }));

const getAll = (boardId) => taskRepo.getAll(boardId);
const getTask = (boardId, taskId) => taskRepo.getTask(boardId, taskId);
const updateTask = (boardId, taskId, taskData) =>
  taskRepo.updateTask(boardId, taskId, taskData);
const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);

module.exports = { create, getAll, getTask, updateTask, deleteTask };
