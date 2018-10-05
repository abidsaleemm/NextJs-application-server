FROM node:alpine

ARG MACHINENAME=application-server
ENV MACHINENAME=${MACHINENAME}

RUN mkdir -p /usr/src && mkdir -p /usr/src/certs

WORKDIR /usr/src

# Setup ffmpeg to handle video rendering.
# RUN apt-get update && apt-get install ffmpeg -y
RUN npm install pm2 -g

# Bundle app source
COPY . /usr/src/

EXPOSE 3000
EXPOSE 3001

CMD pm2-docker --public gz4rkzmirzdlp2r --secret 9761q3vfr9xyfih process.json --machine-name $MACHINENAME
