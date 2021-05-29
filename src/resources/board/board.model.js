const { v1: uuid } = require('uuid');

/** Create Class Board. */
class Board {

  /**
   * Create a Board.
   * @param {number} id - Board id.
   * @param {string} title - Board title.
   * @param {array} columns - Board Columns.
   */
  constructor({
    id = uuid(),
    title = 'Board1',
    columns = [
      {
        id: uuid(),
        title: 'string',
        order: 0,
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
