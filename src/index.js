const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const UserAccessError = require("./error/userAccessError");
const makeLoginRoute = require("./routes/login/index");
const makeRegisterRoute = require("./routes/register/index");
const makeVerifyRoute = require("./routes/verify/index");

module.exports = {
  start: function (secret, port) {
    let app = express();

    // Logger
    // TODO: utilizzarlo solo in fase di sviluppo
    app.use(logger("dev"));

    // Enable CORS
    app.use(cors());
    app.options('*', cors());

    // Add body parser for json
    app.use(bodyParser.json());

    // Routes
    app.post('/register', makeRegisterRoute(secret));
    app.post('/login', makeLoginRoute(secret));
    app.post('/verify', makeVerifyRoute(secret));

    // Errors handler
    app.use(function (err, req, res, next) {
      console.error(err);
      if (err instanceof UserAccessError) {
        res.status(401).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
    });

    return app.listen(port || 3000);
  }
};