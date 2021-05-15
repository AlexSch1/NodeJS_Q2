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


//
// router.route('/:userId').put(async (req, res) => {
//   const user = await usersService.updateUserById(req.body, req.params.userId);
//
//   if (!user) {
//     res.status(404).json({
//       message: 'User not found...',
//     });
//   }
//
//   res.json(User.toResponse(user));
// });
//
// router.route('/:userId').delete(async (req, res) => {
//   const result = await usersService.deleteUser(req.params.userId);
//
//   if (!result) {
//     res.status(404).json({
//       message: 'Some error...',
//     });
//   }
//
//   res.status(204);
// });

module.exports = router;
