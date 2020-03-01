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
  let server = null;
  if (SECRET_KEY) {
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
      let httpCode;
      if (err instanceof UserAccessError) {
        httpCode = 401;
      } else {
        httpCode = 500;
      }
      res.status(httpCode).send(err.message);
    });

    server = app.listen(PORT, () => console.log('Server started'));
  } else {
    console.error("Server NOT started. Secret key not found.");
    process.exit(1);
  }

  return server;
}

module.exports = {
  start: startServer
}