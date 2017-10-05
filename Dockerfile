FROM keymetrics/pm2:latest
ARG MACHINENAME=application-server
ENV MACHINENAME=${MACHINENAME}

RUN mkdir -p /usr/src
RUN mkdir -p /usr/src/certs

WORKDIR /usr/src

RUN yum update
RUN yum install -y poppler

COPY package.json /usr/src/
RUN npm install

# Bundle app source
COPY . /usr/src/

RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD pm2-docker --public gz4rkzmirzdlp2r --secret 9761q3vfr9xyfih process.json --machine-name $MACHINENAME
