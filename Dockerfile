FROM node:stretch

ARG MACHINENAME=application-server
ENV MACHINENAME=${MACHINENAME}

RUN mkdir -p /usr/src
RUN mkdir -p /usr/src/certs

COPY id_rsa /root/.ssh/

WORKDIR /usr/src

# Setup ffmpeg to handle video rendering.
RUN apt-get update
RUN apt-get install ffmpeg -y

RUN npm install pm2 -g

# Bundle app source
COPY . /usr/src/

# RUN chmod -R 0755 /usr/src/static

RUN npm install
RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD pm2-docker --public gz4rkzmirzdlp2r --secret 9761q3vfr9xyfih process.json --machine-name $MACHINENAME
