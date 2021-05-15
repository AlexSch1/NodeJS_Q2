const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const errorHandler = require('../../utils/error/errorHandler');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.userId);
    res.json(User.toResponse(user));
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').put(async (req, res) => {
  try {
    const user = await usersService.updateUser(req.body, req.params.userId);
    res.json(User.toResponse(user));
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:userId').delete(async (req, res) => {
  try {
    await usersService.deleteUser(req.params.userId);
    res.status(204).json('The user has been deleted');
  } catch (e) {
    errorHandler(res, e);
  }
});

module.exports = router;
