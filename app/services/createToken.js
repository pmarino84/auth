const jwt = require('jsonwebtoken');

module.exports = function createToken(id, username, secret, options) {
  let data = {
    id: id,
    username: username
  };
  return jwt.sign(data, secret, options);
};