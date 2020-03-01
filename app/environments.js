const env = process.env;

const NODE_ENV = env.NODE_ENV;
const PORT = env.PORT;
const SECRET_KEY = env.SECRET_KEY;

const IS_PRODUCTION = 'production' === NODE_ENV;
const IS_DEVELOPMENT = !IS_PRODUCTION;

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  PORT,
  SECRET_KEY
};