const USERS = [
  {
    id: 'string',
    name: 'Alex',
    login: 'Alex',
    password: '123',
  },
];

const getAll = async () => USERS;

const createUser = (user) => {
  USERS.push(user);
};

const getUserById = (id) => USERS.find((user) => user.id === id);

const updateUserById = async (userInfo, id) => {
  const user = USERS.find((item) => item.id === id);

  if (!user) {
    return null;
  }

  user.name = userInfo.name;
  user.login = userInfo.login;
  user.password = userInfo.password;

  return user;
};

module.exports = { getAll, createUser, getUserById, updateUserById };
