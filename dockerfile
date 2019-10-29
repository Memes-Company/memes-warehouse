FROM node:10.17.0-alpine
RUN apk add yarn

COPY package.json /node/app/package.json
RUN cd /node/app; yarn
COPY . /node/app
WORKDIR /node/app
RUN yarn
RUN yarn run-migrations