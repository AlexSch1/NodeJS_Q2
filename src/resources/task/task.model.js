const { v1: uuid } = require('uuid');

/** Create Class Task. */
class Task {

  /**
   * Create a Task.
   * @param {number} id - Task id.
   * @param {string} title - Task title.
   * @param {number} order - Task order.
   * @param {string} description - Task description.
   * @param {(number|null)} userId - Task description.
   * @param {(number|null)} boardId - Task description.
   * @param {(number|null)} columnId - Task description.
   */
  constructor({
    id = uuid(),
    title = 'title',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Static method. Get Task without id.
   * @param {Task} task - Class Task.
   * @return {Object} Task without id.
   */
  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}

module.exports = Task;
