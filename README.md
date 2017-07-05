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

## Directory structure

```
. 
├─ api          - API based functions here.               
├─ auth         - PassportJS strategy functions and user based functions.
├─ components   - Reusable React components are declared here.
├─ dicom        - Functions for querying and reading DICOM files from storage.
├─ modules      - Module specific for creating initial state data. (Spine, Shoulder, Knee)
├─ pages        - React pages for NextJS.
├─ projects     - Functions for querying, saving and reading projects from storage.
├─ routes       - Express routing handling functions.
├─ socketApi    - Socket.io functions for client API.
└─ styles       - SCSS style sheets for front-end components. Global sheets also.
```

## Project storage

TODO Add description

Snapshots contain an application state payload.

Adapter functions
- getProject({ studyUID })
- getProjectList()
- getProjectSnapshot({ studyUID })
- setProjectSnapshot{ studyUID, payload })
- setProject({ studyUID, props })

### Local (used for testing without internet)

TODO Add description

### Azure Storage 

TODO Add description

## DICOM storage

TODO Add description

Adapter functions
- getImage({ instanceUID })
- getSeries({ studyUID })
- getStudies()
- getStudy({ studyUID })

### Local (used for testing without internet)

Local DICOM storage contains no database, but instead just scans all the DICOM files inside a set directory on startup.  This is only recommended with a high speed SSD drive and is very inefficient and only recommended for testing purposes.

### Azure

Three tables contain the DICOM lookup information stored using Azure Table Storage. 

```
{CONTAINER_NAME}Studies
{CONTAINER_NAME}Series
{CONTAINER_NAME}Images
```

TODO Add additional information regarding PartitionKey and Rowkey.

## Getting started

```sh
git clone git@bitbucket.org:interbizconsulting/application-server.git
cd application-server
npm install
```

## Running

TODO

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
docker build -t multus/application-server .
docker push multus/application-server
```

Test Docker locally.

```bash
docker run -it -v /etc/letsencrypt/live/multus.hack.expert:/usr/certs hackexpert/application-server
```
