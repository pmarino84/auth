const server = require("./src/index");

const SECRET_KEY = "<YOUR SECRET KEY>";

server.start(SECRET_KEY, process.env.port);