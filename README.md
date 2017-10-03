# Multus Server Application

TODO Add more description

## Requirements:

- Node > 7 - https://nodejs.org
- Yarn - https://yarnpkg.com/en/
- Express - https://expressjs.com/
- Nextjs - https://zeit.co/blog/next2
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
├─ actions      - Redux actions. 
├─ api          - API based functions here.               
├─ auth         - PassportJS strategy functions and user based functions.
├─ components   - Reusable React components are declared here.
├─ constants    - Redux action types defined here.
├─ containers   - Redux container connected components.
├─ dicom        - Functions for querying and reading DICOM files from storage.
├─ hoc          - React Higher Order Components
├─ modules      - Module specific for creating initial state data for client frontend. (Spine, Shoulder, Knee)
├─ pages        - React pages for NextJS.
├─ projects     - Functions for querying, saving and reading projects from storage.
├─ query        - Data querying functions.
├─ reducers     - Redux state reducers.
├─ routes       - Express routing handling functions.
├─ socketApi    - Socket.io functions for client API.
├─ styles       - SCSS style sheets for front-end components. Global sheets also.
└─ video       - Video Rendering processing code.
```


# Live site

Live site can be accessed at:

https://portal.multusmedical.com

_Test user:_
user: user@test.com
pass: test91a

_Test client:_
user: client@test.com
pass: test91a

## Environment variables / Access keys

Access keys to storage accounts need to be set as environment vars.

*Note:  These do not apply if you are locally testing. This is required for Azure testing.*

Below is an example env file.

```bash
# Required
STORAGE=multus
STORAGE_KEY=$KEY
STORAGE2=nhf        # Used to grab DICOM files from NHF file storage account for now.  
STORAGE2_KEY=$KEY   # Used to grab DICOM files from NHF file storage account for now.  

# Optional
DICOM_CONTAINER=dicom   # default 'dicom'
PROJECT_TABLE=projects  # default 'projects'
LOCAL_PATH=             # Path to DICOM store in local directory.  Only used to local testing.   
```

## Project storage

TODO Add description

Snapshots contain an application state payload.

Adapter functions:

```javascript
getProject({ studyUID })
getProjectList()
getProjectSnapshot({ studyUID })
setProjectSnapshot({ studyUID, payload })
setProject({ studyUID, props })
```

### Local (used for testing without internet)

TODO Add description

### Azure Storage 

TODO Add description

## DICOM storage

TODO Add description.  Add return object structure.

Adapter functions:

```javascript
getImages({ seriesUID })
getSeries({ studyUID })
getStudies()
getStudy({ studyUID })
```

### Local (used for testing without internet)

Local DICOM storage contains no database, but instead just scans all the DICOM files inside a set directory on startup.  This is only recommended with a high speed SSD drive and is very inefficient and only recommended for testing purposes.

### Azure

Three tables contain the DICOM lookup information stored using Azure Table Storage. 

*Note: default for DICOM_CONTAINER is "dicom"*

```
{DICOM_CONTAINER}Studies
{DICOM_CONTAINER}Series
{DICOM_CONTAINER}Images
```

TODO Add additional information regarding PartitionKey and Rowkey.

## Getting started

```sh
git clone git@github.com:MultusMedical/application-server.git
cd application-server
yarn install
```

## Testing locally

The following yarn commands can be ran to test the app locally.  You can specify which adapter you want to use for testing.

```
yarn local   # Test using local DB adapters.  Requires no internet connection.
yarn azure   # Test using azure DB adapters.
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
docker run -it -v /etc/letsencrypt/archive/portal.multusmedical.com:/usr/certs hackexpert/application-server
```
