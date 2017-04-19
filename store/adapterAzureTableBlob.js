import azure from 'azure-storage';
import uuid from 'uuid';
import zlib from 'zlib';
import streamBuffers from 'stream-buffers';

// issue-1 remove these from source before REKEY
process.env.AZURE_STORAGE_ACCOUNT = 'multus';
process.env.AZURE_STORAGE_ACCESS_KEY = 'w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==';

const tableSvc = azure.createTableService();
const blobSvc = azure.createBlobService();

// Helper Functions
const lookupLast = (studyUID, callback) => {
  tableSvc.retrieveEntity('projects', studyUID, 'index', (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    callback(error, result, response);
  });
}

const insertSnapshotID = ({ id = 0, studyUID, data, etag }, callback) => {
  const batch = new azure.TableBatch();

  console.log('New id', id);
  const blobKey = uuid();
  const record = {
    PartitionKey: { '_': studyUID },      
    RowKey: { '_': id.toString() },
    blobKey: { '_': blobKey },
    // md5, // issue-10 Handle Checksum
  };

  batch.insertEntity(record, { echoContent: true });
  batch.insertOrMergeEntity({
    PartitionKey: { '_': studyUID },      
    RowKey: { '_': 'index' },
    index: { '_': id },
    '.mlookupSnapshotBlobetadata': { etag },
  }, { echoContent: true });

  tableSvc.executeBatch('projects', batch, (error, result, response) => {
    if(error) {
      callback(error);
      return;
    }

    insertSnapshotBlob(blobKey, data, callback);
  });
}

const insertSnapshotBlob = (name, data, callback) => {
  const json = JSON.stringify(data);

  // console.log(c.toLocaleDateString()+ ' ' + c.toLocaleTimeString());
  const metricStartZip = new Date();  
  // Zip contents
  zlib.gzip(json, (error, result) => {
    if (error) {
      callback(error);
      return;
    }

    console.log(`Zip Duration ${(((new Date()) - metricStartZip) / 1000)} secs`);

    const readStream = new streamBuffers.ReadableStreamBuffer();
    const length = result.length;
    readStream.put(result);
    readStream.stop();
    
    const metricStartBlob = new Date();  
    blobSvc.createBlockBlobFromStream('projects', name, readStream, length, (error, response) => {
      if (error) {
        callback(error);
        return;
      }
          
      console.log(`Blob Saved ${name} Duration ${(((new Date()) - metricStartBlob) / 1000)} sec`);
      callback(null);
    });

  });
};

const lookupSnapshotBlob = (name = '', callback) => {
  const writeStream = new streamBuffers.WritableStreamBuffer();

  blobSvc.getBlobToStream('projects', name, writeStream, (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    zlib.gunzip(writeStream.getContents(), (error, result) => {
      if (error) {
        callback(error);
        return;
      }

      const parsed = JSON.parse(result);
      callback(null, parsed);
    });
  });
};

const lookupProject = (studyUID, id = 0, callback) => {
  tableSvc.retrieveEntity('projects', studyUID, id.toString(), (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    callback(error, result, response);
  });
}

const queryProjects = (callback) => {
  const query = new azure.TableQuery()
    .where('RowKey eq ?', 'index');

  tableSvc.queryEntities('projects', query, null, (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    callback(error, result, response);
  });
}

export default () => {
  return {
    getProjects: (callback = () => {}) => {
      queryProjects((error, { entries = []}, response) => {
        const retPromises = entries.map(({ PartitionKey: { '_': PartitionKey }, index: { '_': index } }) => 
          new Promise((resolve, reject) => {
            lookupProject(PartitionKey, index, (error, { blobKey: { '_': blobKey = ''} = {} }) => {
              if (error) {
                reject(error);
              }
              
              // Get Blob
              lookupSnapshotBlob(blobKey, (error, content) => {
                if (error) {
                  reject(error);
                }
                
                resolve(content);
              })
            });
          }));

        Promise.all(retPromises).then((projects = []) => {
          callback(null, projects);
        });
      });
    },
    setProject: (studyUID = null, data = {}, callback = () => {}) => {
      lookupLast(studyUID, (error, { index: { '_': index = 0 } = {}, '.metadata': { etag } = {} } = {}, response) => {
        insertSnapshotID({ id: index + 1, data, studyUID, etag },  (error) => {
          console.log('Snapshot saved', error);
        });
      });
    },
  }
};
