# Multus Server Application

TODO Add more description

## Frameworks and APIs used:

- Node - https://nodejs.org
- Ramda - http://ramdajs.com
- Express - https://expressjs.com/
- Nextjs - https://github.com/zeit/next.js/
- React - https://facebook.github.io/react/
- PassportJS - http://passportjs.org/
- Websockets (Socket.io) - https://socket.io/
- React Strap - https://reactstrap.github.io/
- Azure Table Storage - https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-table-storage
- Azure Blob Storage - https://docs.microsoft.com/en-us/azure/storage/storage-nodejs-how-to-use-blob-storage
- lowdb - (Used for local testing and debugging) - https://github.com/typicode/lowdb

## Directory structure

```
.
├─ actions          - Redux actions.
├─ adapter          - Storage adapter functions. See more detailed description below.
├─ auth             - PassportJS strategy functions and user based functions.
├─ components       - Reusable React components are declared here.
├─ constants        - Redux action types defined here.
├─ containers       - Redux container connected components.
├─ helpers          - Scoped utility functions.
├─ hoc              - React Higher Order Components
├─ middleware       - Express and Redux middleware functions.
├─ modules          - Module specific for creating initial state data for client frontend. (Spine, Shoulder, Knee)
├─ pages            - React pages for NextJS.
├─ projectsLocal    - Local storage directory.
├─ reducers         - Redux state reducers.
├─ routes           - Express routing handling functions.
├─ selectors        - Redux selectors.
├─ sessiondb        - Local express session storage.
├─ socketEditor     - Socket.io end point functions for 3-D Editor App.
├─ socketServer     - Socket.io end point functions for server nextjs app.
├─ static           - Static hosted resources.
├─ store            - Redux store function and initialization code.
├─ styles           - SCSS style sheets for front-end components. Global sheets also.
└─ video            - Video rendering processing code.
```

## Adapter structure

TODO: These functions should be moved to separtate repo for reusablbility.

```
├─ dicom        - Functions for querying and reading DICOM files from storage.
├─ projects     - Functions for querying, saving and reading projects from storage.
├─ users        - User based functions for retrieving and saving. (TODO Add groups)
├─ projects     - Functions for querying, saving and reading projects from storage.
├─ file     - Functions for querying, saving and reading projects from storage.
```

## Adapter API specific functions

### Azure

```
blob    - Blob storage API functions
table   - Table storage based functions
```

## Environment variables / Access keys

Access keys to storage accounts need to be set as environment vars.

_Note: These do not apply if you are locally testing. This is required for Azure testing._

Below is an example env file.

```bash
# Required
STORAGE_ACCOUNT=multus
STORAGE_ACCOUNT_KEY=$KEY

# Optional
CONTAINER_NAME=dicom   # default 'dicom'
PROJECT_TABLE=projects  # default 'projects'
DICOM_PATH=             # Path to DICOM store in local directory.  Only used to local testing.
RENDER=true             # This allows server to bypass security check on socket.io connection.
```

## Project storage

TODO Add description

Snapshots contain an application state payload.

Adapter functions:

```javascript
getProject({ studyUID });
getProjectList();
getProjectSnapshot({ studyUID });
setProjectSnapshot({ studyUID, payload });
setProject({ studyUID, props });
```

### Local (used for testing without internet)

TODO Add description

### Azure Storage

TODO Add description

## DICOM storage

TODO Add description. Add return object structure.

Adapter functions:

```javascript
getImages({ seriesUID });
getSeries({ studyUID });
getStudies();
getStudy({ studyUID });
```

### Local (used for testing without internet)

Local DICOM storage contains no database, but instead just scans all the DICOM files inside a set directory on startup. This is only recommended with a high speed SSD drive and is very inefficient and only recommended for testing purposes.

### Azure

Three tables contain the DICOM lookup information stored using Azure Table Storage.

_Note: default for CONTAINER_NAME is "dicom"_

```
{CONTAINER_NAME}Studies
{CONTAINER_NAME}Series
{CONTAINER_NAME}Images
```

TODO Add additional information regarding PartitionKey and Rowkey.

## Getting started

```sh
git clone git@github.com:MultusMedical/application-server.git
cd application-server
yarn install
```

## Testing locally

The following yarn commands can be ran to test the app locally. You can specify which adapter you want to use for testing.

```
yarn local   # Test using local DB adapters.  Requires no internet connection.
yarn azure   # Test using azure DB adapters.
```

# Advanced

NOTE: Needs access to docker cloud.

## Deployment script

The deployment script will build a docker image and push to Docker Hub. After the build and push process the script will remotely connect the VM via SSH and pull the latest image and restart.

```bash
./deploy.bash
```

## Manual deployment commands

Login using the following commands if not already. NOTE: You might have to sudo.

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
docker run -it -v /etc/letsencrypt/archive/portal.multusmedical.com:/usr/certs hackexpert/application-server
```
