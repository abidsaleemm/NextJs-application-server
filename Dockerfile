FROM node:alpine

RUN mkdir -p /usr/src && mkdir -p /usr/src/certs && npm install pm2 -g
WORKDIR /usr/src

COPY . /usr/src/
EXPOSE 3000
CMD pm2-docker process.json
