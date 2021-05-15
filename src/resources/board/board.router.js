const router = require('express').Router();
const boardService = require('./board.service');
const errorHandler = require('../../utils/error/errorHandler');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardService.getAll();
    res.json(boards);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.boardId);
    res.json(board);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardService.create(req.body);
    res.status(201).json(board);
  } catch (e) {
    errorHandler(res, e);
  }
});


router.route('/:boardId').put(async (req, res) => {
  try {
    const board = await boardService.updateBoard(req.body, req.params.boardId);
    res.json(board);
  } catch (e) {
    errorHandler(res, e);
  }
});

router.route('/:boardId').delete(async (req, res) => {
  try {
    await boardService.deleteBoard(req.params.boardId);
    res.status(200).send('The board has been deleted');
  } catch (e) {
    errorHandler(res, e);
  }
});

module.exports = router;
