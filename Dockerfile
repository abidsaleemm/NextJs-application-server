FROM keymetrics/pm2:8

RUN mkdir -p /usr/src
RUN mkdir -p /usr/src/certs

WORKDIR /usr/src

COPY package.json /usr/src/
RUN npm install


# Bundle app source
COPY . /usr/src/

EXPOSE 3000
CMD ["pm2-docker", "--public", "gz4rkzmirzdlp2r", "--secret", "9761q3vfr9xyfih", "process.json", "--machine-name", "application-server"]
