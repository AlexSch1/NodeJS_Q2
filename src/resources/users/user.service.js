const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const { HttpError } = require('../../utils/error/httpError');

/** This function get all Users.
 * @return {Promise<User[]>} - Array users.
 * */
const getAll = () => usersRepo.getAll();

/** Create a new User and return created User.
 * @param {Object} obj - Data for new User.
 * @param {string} obj.name - Name for new User.
 * @param {string} obj.login - Login for new User.
 * @param {string} obj.password - Password for new User.
 * @return {Promise<User>} - User.
 * */
const create = ({ name, login, password }) =>
  usersRepo.create(new User({ name, login, password }));

/** This function get User by id.
 * @param {number} id - User's id.
 * @return {Promise<User>} - User.
 * */
const get = async (id) => {
  const user = await usersRepo.get(id);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return user;
};

/** Update a User in DB and return updated User.
 * @param {Object} userInfo - New data for User.
 * @param {number} id - User id.
 * @return {Promise<User>} - User.
 * */
const updateUser = (userInfo, id) => usersRepo.updateUser(userInfo, id);

/** Delete a User in DB and return deleted User or empty array.
 * @param {number} id - User id.
 * @return {Promise<User[]>} - Promise array with deleted User or empty array.
 * */
const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, create, get, updateUser, deleteUser };
