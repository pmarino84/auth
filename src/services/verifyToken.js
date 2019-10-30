const jwt = require('jsonwebtoken');

module.exports = function verifyToken(token, secret, options) {
  return jwt.verify(token, secret, options);
};