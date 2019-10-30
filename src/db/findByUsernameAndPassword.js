const users = require("./users");

module.exports = function findByUsernameAndPassword(username, password) {
  return users.find(user => username == user.username && password == user.password);
}