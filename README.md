# Multus Server Application

TODO Server application:

- Instance scaling

### Requirements:

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

### Getting started

```sh
git clone git@bitbucket.org:interbizconsulting/application-server.git
cd application-server
npm install
```

# Testing locally

```bash
npm run dev
```

TODO add additional run commands.

# Azure Deployment

Auto deployment is handled using a Docker image and Bitbucket pipelines.  All you have to do is push code and the app will auto deploy.

## Manual Deployment
Login using the following commands.  NOTE: You might have to sudo.

```sh
docker login -u $DOCKER_USER -p $DOCKER_PASS
```

Building and pushing to Docker Hub.

```sh
docker build -t hackexpert/multus .
docker push hackexpert/multus
```

# Kudu advanded tools

Provides terminal access to the server through web portal interface.  A shell can be used for debugging and viewing logs.

https://multus.scm.azurewebsites.net/

TODO Add Azure portal screenshot

NOTE:  This has been problematic and might not work.  If this is the case usually FTPS is still available (see below).

# Accessing logs and home directory via FTPS

Mounts a directory.

```bash
curlftpfs -d -v  -o user=multus:$PASSWORD,ssl waws-prod-bay-063.ftp.azurewebsites.windows.net $MOUNT_POINT
```

