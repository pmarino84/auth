const verifyToken = require("../../services/verifyToken");

module.exports = function makeVerifyRoute(secret) {
  return (req, res) => {
    let body = req.body;
    let token = body.token;
  
    try {
      let decoded = verifyToken(token, secret);
      res.status(200).send({ decoded: decoded });
    } catch(ex) {
      res.status(500).send({ message: ex.message });
    }
  };
}