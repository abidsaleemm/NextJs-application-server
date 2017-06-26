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

Local test server can be ran for testing. Note: This does not uses SSL and is insecure.

```bash
npm run dev
```

TODO add additional run commands.

# VM Setup

Debian 9 (Strech)

In some cases the VM will have to be re-provisioned.  At the moment this has to be done manually and then the following tasks have to be performed.  TODO In the future a script will handle this.

## Install Docker and Docker-Compose

```
# Install Docker
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce

# Install docker-compose
sudo bash -c "curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose"
sudo chmod +x /usr/local/bin/docker-compose
```

Note: Some systems will already have a version 3 available via package manager.

## Setup Docker login

This allows the docker watcher to auto pull if there is a updated image.

```
docker login -u $DOCKER_USER -p $DOCKER_PASS
```

## Manually copy Docker Compose file to root 

NOTE: Using the pipelines will hande this automatically.

```
scp docker-compose.yml adminuser@multus.westus.cloudapp.azure.com:~/
```

NOTE: If a redeployment occurred you might have to remove entry from ssh known_hosts file.

## SSH in or start docker compose remotely

TODO

# App deployment using Pipelines

TODO
Auto deployment is handled using a Docker image and Bitbucket pipelines.  All you have to do is push code and the app will auto deploy.

## Manual image deployment locally

Login using the following commands if not already.  NOTE: You might have to sudo.

```sh
docker login -u $DOCKER_USER -p "$DOCKER_PASS"
```

Building and pushing to Docker Hub.

```sh
docker build -t hackexpert/multus .
docker push hackexpert/multus
```

# SSL

## Certbot setup

SSL certificates have to be set up to handle 
```
# Installation
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto 

# Run and walk through setup
./certbot-auto certonly --standalone -d multus.westus.cloudapp.azure.com
```
Location of saved cert files

```
/etc/letsencrypt/live/multus.westus.cloudapp.azure.com/
```

IMPORTANT NOTE: The /etc/letsencrypt/ directory needs to be backed up on the VM.

## Setup volume mount

Certbot recommends not to move or use the SSL files from a different location than the default.  In that case we leave them on the VM and mount them to the docker container.

# Important commands

Run as regular Docker container. Not using docker-s
```bash
docker run -it -v /etc/letsencrypt/live/multus.hack.expert:/usr/certs hackexpert/multus
```

Add user to docker group.  Don't need to sudo.
```bash
usermod -a -G docker user1
```

# Copy docker-compose file

```bash
scp docker-compose.yml adminuser@multus.westus.cloudapp.azure.com:~/
```
