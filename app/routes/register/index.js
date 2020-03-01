const addUser = require("../../db/addUser");
const createToken = require("../../services/createToken");

module.exports = function makeRegisterRoute(secret) {
  return (req, res) => {
    let body = req.body;
    let username = body.username;
    let password = body.password;
  
    let user = addUser(username, password);
    let token = createToken(user._id, username, secret);
    res.status(201).send({ token: token });
  };
}