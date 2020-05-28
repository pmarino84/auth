const env = process.env

const NODE_ENV = env.NODE_ENV || 'development'

const IS_PRODUCTION = NODE_ENV === 'production'
const IS_DEVELOPMENT = !IS_PRODUCTION

const PORT = env.PORT || 3000
const SECRET_KEY = env.SECRET_KEY

const DB_USER = env.DB_USER
const DB_USER_PASSWORD = env.DB_USER_PASSWORD
const DB_NAME = env.DB_NAME
const DB_PORT = env.DB_PORT

console.log('ENVIRONMENTS: ', {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  PORT,
  SECRET_KEY,
  DB_USER,
  DB_USER_PASSWORD,
  DB_NAME,
  DB_PORT
})

module.exports = {
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  PORT,
  SECRET_KEY,
  DB_USER,
  DB_USER_PASSWORD,
  DB_NAME,
  DB_PORT
}
