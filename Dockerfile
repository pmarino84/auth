FROM node:13-alpine AS builder

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG PORT=3030
ENV PORT=${PORT}

RUN apk --no-cache add python make g++

COPY package*.json ./
RUN npm install

FROM node:13-alpine

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules

COPY . .

CMD ["npm", "start"]