const User = require('../resources/users/user.model');

const USERS = [new User(), new User()];

const getAllUsers = async () => [...USERS];

const getUser = async (id) => USERS.find((user) => user.id === id);

const createUser = async (user) => {
  USERS.push(user);
  return User.toResponse(user);
};

const updateUser = async (userInfo, id) => {
  const user = await getUser(id);

  user.name = userInfo.name;
  user.login = userInfo.login;
  user.password = userInfo.password;

  return user;
};

const deleteUser = async (id) => {
  const index = USERS.find((user) => user.id === id);
  return USERS.splice(+index, 1);
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
