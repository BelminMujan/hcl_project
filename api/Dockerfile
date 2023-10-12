# syntax=docker/dockerfile:1

ARG NODE_VERSION=16.20.2

FROM node:${NODE_VERSION}-alpine
USER node

WORKDIR /app/api
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

CMD node server.js
