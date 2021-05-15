const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const { HttpError } = require('../../utils/error/httpError');


const getAll = () => usersRepo.getAll();

const create = ({ name, login, password }) => usersRepo.create(new User({ name, login, password }))

const get = async (id) => {
  const user = await usersRepo.get(id);

  if (!user) {
    throw new HttpError(404,'User not found')
  }

  return user;
};
//
// const updateUserById = (userInfo, id) => usersRepo.updateUserById(userInfo, id);

module.exports = { getAll, create, get };
