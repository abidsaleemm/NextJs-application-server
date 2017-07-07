FROM node

RUN mkdir -p /usr/src
RUN mkdir -p /usr/src/certs

WORKDIR /usr/src

COPY package.json /usr/src/
RUN npm install

# Bundle app source
COPY . /usr/src/

EXPOSE 3000

CMD [ "npm", "start" ]