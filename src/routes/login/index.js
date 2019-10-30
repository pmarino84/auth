const findByUsernameAndPassword = require("../../db/findByUsernameAndPassword");
const UserAccessError = require("../../error/userAccessError");
const createToken = require("../../services/createToken");

module.exports = function makeLoginRoute(secret) {
  return (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
  
    let user = findByUsernameAndPassword(username, password);
    if(!user) {
      throw new UserAccessError(`User ${username} not found.`);
    } else {
      let token = createToken(user._id, username, secret);
      res.status(201).send({ token: token });
    }
  };
}