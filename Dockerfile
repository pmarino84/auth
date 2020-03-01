FROM node:13-alpine AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3000
ENV PORT=${PORT}
ARG SECRET_KEY
ENV SECRET_KEY=${SECRET_KEY}

COPY package*.json ./

RUN apk --no-cache add python make g++ && npm install && npm cache clean --force

FROM node:13-alpine

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["node", "./index.js"]