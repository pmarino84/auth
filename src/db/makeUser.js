const uuid = require("uuid");

module.exports = function makeUser(username, password) {
  return {
    _id: uuid.v4(),
    username: username,
    password: password
  };
}