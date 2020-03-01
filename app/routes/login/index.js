const findByUsername = require("../../db/findByUsername");
const UserAccessError = require("../../error/userAccessError");
const createToken = require("../../services/createToken");

module.exports = function makeLoginRoute(secret) {
  return (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
  
    let user = findByUsername(username);
    if(!user) {
      throw new UserAccessError(`User with username: ${username} not found.`);
    } else {
      if(password == user.password) {
        let token = createToken(user._id, username, secret);
        res.status(201).send({ token: token });
      } else {
        throw new UserAccessError(`Incorrect password.`);
      }
    }
  };
}