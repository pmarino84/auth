# auth
An express.js service for JWT authentication.
Managed with Docker.

## Prerequisite

  - Install Docker
  - Edit .env file on root folder with preferred:
    . VERSION
    . PORT
    . HOST_PORT

## Development

  Important --legacy-watch on script "npm run serve" is necessary for nodemon to restart server on file changes in window machine.

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