const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: 'Incorrect data...',
    });
  }

  const user = await usersService.createUser(req.body);
  res.json(user);
});

router.route('/:userId').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.userId);

  if (!user) {
    res.status(404).json({
      message: 'User not found...',
    });
  }

  res.json(User.toResponse(user));
});

router.route('/:userId').put(async (req, res) => {
  const user = await usersService.updateUserById(req.body, req.params.userId);

  if (!user) {
    res.status(404).json({
      message: 'User not found...',
    });
  }

  res.json(User.toResponse(user));
});

router.route('/:userId').delete(async (req, res) => {
  const result = await usersService.deleteUser(req.params.userId);

  if (!result) {
    res.status(404).json({
      message: 'Some error...',
    });
  }

  res.status(204);
});

module.exports = router;
