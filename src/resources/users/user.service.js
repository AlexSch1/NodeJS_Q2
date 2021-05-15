const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const createUser = ({ name, login, password }) => {
  const user = new User({ name, login, password });
  usersRepo.createUser(user);

  return user;
};

const getUserById = (id) => usersRepo.getUserById(id);

const updateUserById = (userInfo, id) => usersRepo.updateUserById(userInfo, id);

module.exports = { getAll, createUser, getUserById, updateUserById };
