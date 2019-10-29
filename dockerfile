FROM node:10.17.0-alpine
RUN apk add yarn

COPY . /node/app
WORKDIR /node/app
RUN yarn
RUN yarn run-migrations