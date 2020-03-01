const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

const UserAccessError = require("./error/UserAccessError");
const { IS_DEVELOPMENT, PORT, SECRET_KEY } = require('./environments.js');

const makeLoginRoute = require("./routes/login/index");
const makeRegisterRoute = require("./routes/register/index");
const makeVerifyRoute = require("./routes/verify/index");


function startServer() {
  let app = express();

  // Logger utilizzato solo in fase di sviluppo
  if (IS_DEVELOPMENT) app.use(logger("dev"));

  // Enable CORS
  app.use(cors());
  app.options('*', cors());

  // Add body parser for json
  app.use(bodyParser.json());

  // Routes
  app.post('/register', makeRegisterRoute(SECRET_KEY));
  app.post('/login', makeLoginRoute(SECRET_KEY));
  app.post('/verify', makeVerifyRoute(SECRET_KEY));

  // Errors handler
  app.use(function (err, req, res, next) {
    console.error(err);
    if (err instanceof UserAccessError) {
      res.status(401).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  });

  return app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
}

module.exports = {
  start: startServer
}