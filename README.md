# auth
An express.js service for JWT authentication.
Managed with Docker.

## Prerequisite

  - Install Docker
  - Edit .env file on root folder with preferred:
    - DB_USER
    - DB_PASSWORD
    - DB_NAME
    - DB_PORT
    - BE_PORT
    - BE_HOST_PORT
    - BE_DEBUG_PORT
    - BE_DEBUG_HOST_PORT
    - NODE_ENV
    - SECRET_KEY
    - MYSQL_DATABASE
    - MYSQL_ROOT_PASSWORD
    - MYSQL_USER
    - MYSQL_PASSWORD

## Development

  Important --legacy-watch on script "npm run serve" is necessary for nodemon to restart server on file changes on window machine.

  ### Docker:
    run commands:
      - docker build -t <image_name>:<version> .
      - docker run --rm -it -p <HOST_PORT>:<PORT> -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -w /usr/src/app --name <container_name> <image_name>:<version> npm run serve

  ### Docker compose:
    run commands:
      - docker-compose build
      - docker-compose up

## Production

  run command:

    docker build -t <name>:<version> .


!!!!!!!!!!!!!! FARE IN MODO DI SETTARE NODE_ENV A production PER LA FASE DI BUILD !!!!!!!!!!!!!!