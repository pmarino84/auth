const findByUsernameAndPassword = require("./findByUsernameAndPassword");
const UserAccessError = require("../error/userAccessError");
const users = require("./users");
const makeUser = require("./makeUser");

module.exports = function adUser(username, password) {
  let user;
  if(findByUsernameAndPassword(username, password)) {
    throw new UserAccessError(username + " already exist");
  } else {
    user = makeUser(username, password);
    users.push(user);
  }
  return user;
};