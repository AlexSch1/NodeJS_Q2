const { v1: uuid } = require('uuid');

/** Create Class User. */
class User {

  /**
   * Create a User.
   * @param {number} id - User id.
   * @param {string} name - User title.
   * @param {string} login - User order.
   * @param {string} password - User description.
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Static method. Get User without id.
   * @param {User} user - Class User.
   * @return {Object} User without id.
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
