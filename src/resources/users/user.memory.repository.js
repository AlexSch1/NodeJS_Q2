const DB = require('../../common/DB');

const getAll = () => DB.getAllUsers();

const create = (user) => DB.createUser(user);

const get = id => DB.getUser(id);

// const updateUserById = async (userInfo, id) => {
//   const user = USERS.find((item) => item.id === id);
//
//   if (!user) {
//     return throw error;
//   }
//
//   user.name = userInfo.name;
//   user.login = userInfo.login;
//   user.password = userInfo.password;
//
//   return user;
// };

module.exports = { getAll, create, get};
