const findByUsername = require("./findByUsername");
const validPassword = require("./validPassword");
const UserAccessError = require("../error/userAccessError");
const users = require("./users");
const makeUser = require("./makeUser");

module.exports = function adUser(username, password) {
  let user;
  if(findByUsername(username)) {
    throw new UserAccessError(`User ${username} already exist!`);
  } else {
    if(!validPassword(password)) {
      throw new UserAccessError(`Wrong password!`);
    } else {
      user = makeUser(username, password);
      users.push(user);
    }
  }
  return user;
};