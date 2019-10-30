const users = require("./users");

module.exports = function findByUsername(username) {
  return users.find(user => username == user.username);
}