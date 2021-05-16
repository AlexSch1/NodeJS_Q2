const router = require('express').Router();
const taskService = require('./task.service');
const errorHandler = require('../../utils/error/errorHandler');

router.route('/:boardId/tasks').post(async (req, res) => {
  try {
    const task = await taskService.create(req.body, req.params.boardId);
    res.status(201).json(task);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const tasks = await taskService.getAll(req.params.boardId);
    res.status(200).json(tasks);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await taskService.getTask(
      req.params.boardId,
      req.params.taskId
    );
    if (!task) {
      res.status(404).json('Task not found');
    }
    res.status(200).json(task);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.boardId,
      req.params.taskId,
      req.body
    );
    res.status(200).json(task);
  } catch (e) {
    errorHandler(res, e);
  }
});
router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await taskService.deleteTask(req.params.boardId, req.params.taskId);
    res.status(200).json('The task has been deleted');
  } catch (e) {
    errorHandler(res, e);
  }
});

module.exports = router;
