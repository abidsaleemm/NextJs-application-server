# Multus Server Application

TODO Add more description

## Requirements:

- Node > 7 - https://nodejs.org
- NPM - https://www.npmjs.com/
- Express - https://expressjs.com/
- Nextjs - https://zeit.co/blog/next2
- React - https://facebook.github.io/react/
- PassportJS - http://passportjs.org/
- Websockets (Socket.io) - https://socket.io/
- Azure AD
- Azure Table Storage - https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-table-storage
- Azure Blob Storage - https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-blob-storage
- lowdb - (Used for local testing and debugging) - https://github.com/typicode/lowdb

## Getting started

```sh
git clone git@bitbucket.org:interbizconsulting/application-server.git
cd application-server
npm install
```

## Testing locally

Local test server can be ran for testing. Note: This does not uses SSL and is insecure.

```bash
npm run dev
```

## Deployment script

The deployment script will build a docker image and push to Docker Hub. After the build and push process the script will remotely connect the VM via SSH and pull the latest image and restart.

```bash
./deploy.bash
```

## Manual deployment commands

Login using the following commands if not already.  NOTE: You might have to sudo.

```sh
docker login -u $DOCKER_USER -p "$DOCKER_PASS"
```

Building and pushing to Docker Hub.

```sh
docker build -t hackexpert/multus .
docker push hackexpert/multus
```

## Test Docker locally.
```bash
docker run -it -v /etc/letsencrypt/live/multus.hack.expert:/usr/certs hackexpert/application-server
```
