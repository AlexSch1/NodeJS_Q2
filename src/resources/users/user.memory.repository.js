const DB = require('../../common/DB');
const { HttpError } = require('../../utils/error/httpError');

const getAll = () => DB.getAllUsers();

const create = (user) => DB.createUser(user);

const get = (id) => DB.getUser(id);

const updateUser = (userInfo, id) => DB.updateUser(userInfo, id);

const deleteUser = async (id) => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  return DB.deleteUser(id);
};

module.exports = { getAll, create, get, updateUser, deleteUser };
