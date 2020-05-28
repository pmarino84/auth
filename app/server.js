const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const UserAccessError = require('./error/UserAccessError')
const { IS_DEVELOPMENT, PORT, SECRET_KEY, DB_USER, DB_USER_PASSWORD, DB_NAME, DB_PORT } = require('./environments.js')
const makeLoginRoute = require('./routes/login/index')
const makeRegisterRoute = require('./routes/register/index')
const makeVerifyRoute = require('./routes/verify/index')
const mysql = require('mysql')


function startServer() {
  let server = null
  if (SECRET_KEY) {
    let app = express()

    // Logger utilizzato solo in fase di sviluppo
    if (IS_DEVELOPMENT) app.use(logger('dev'))

    // Enable CORS
    app.use(cors())
    app.options('*', cors())

    // Add body parser for json
    app.use(bodyParser.json())

    // Routes
    app.post('/register', makeRegisterRoute(SECRET_KEY))
    app.post('/login', makeLoginRoute(SECRET_KEY))
    app.post('/verify', makeVerifyRoute(SECRET_KEY))

    app.get('/', (req, res) => {
      res.send('Pagina bianca')
    })

    // Errors handler
    app.use(function (err, req, res, next) {
      console.error(err)
      let httpCode
      if (err instanceof UserAccessError) {
        httpCode = 401
      } else {
        httpCode = 500
      }
      res.status(httpCode).send(err.message)
    })

    server = app.listen(PORT, () => console.log('Server started at port: ' + PORT))
  } else {
    console.error('Server NOT started. Secret key not found.')
    process.exit(1)
  }

  return server
}

module.exports = {
  start: () => {
    const con = mysql.createConnection({
      host: 'db-dev',
      port: DB_PORT,
      user: DB_USER,
      password: DB_USER_PASSWORD,
      database: DB_NAME
    })

    con.connect(err => {
      if (err) {
        console.error('PORCO DIO - Failed to connect to db: ', err.message)
        return
      }
      console.log('Successfully connected to DB!')
      startServer()
    })
  }
}
