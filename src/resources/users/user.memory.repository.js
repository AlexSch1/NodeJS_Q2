const DB = require('../../common/DB');
const { HttpError } = require('../../utils/error/httpError');

/** This function get all Users.
 * @return {Promise<User[]>} - Array users.
 * */
const getAll = () => DB.getAllUsers();

/** Create a new User and return created User.
 * @param {User} user - A new User.
 * @return {Promise<User>} - User.
 * */
const create = (user) => DB.createUser(user);

/** This function get User by id.
 * @param {number} id - User's id.
 * @return {Promise<User>} - User.
 * */
const get = (id) => DB.getUser(id);

/** Update a User in DB and return updated User.
 * @param {Object} userInfo - New data for User.
 * @param {number} id - User id.
 * @return {Promise<User>} - User.
 * */
const updateUser = (userInfo, id) => DB.updateUser(userInfo, id);

/** Delete a User in DB and return deleted User or empty array.
 * @param {number} id - User id.
 * @return {Promise<User[]>} - Promise array with deleted User or empty array.
 * */
const deleteUser = async (id) => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return DB.deleteUser(id);
};

module.exports = { getAll, create, get, updateUser, deleteUser };
