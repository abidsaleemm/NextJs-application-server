import azure from 'azure-storage';
import uuid from 'uuid';
import zlib from 'zlib';
import streamBuffers from 'stream-buffers';
import leftPad from 'left-pad';

// issue-1 remove these from source before REKEY
process.env.AZURE_STORAGE_ACCOUNT = 'multus';
process.env.AZURE_STORAGE_ACCESS_KEY = 'w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==';

const tableSvc = azure.createTableService();
const blobSvc = azure.createBlobService();

// Helper Functions
const lookupLast = (tableName, studyUID, callback) => {
  tableSvc.retrieveEntity(tableName, studyUID, 'index', (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    callback(error, result, response);
  });
}

const insertSnapshotID = (tableName, id = 0, studyUID, data, etag, callback) => {
  const batch = new azure.TableBatch();
  const blobKey = uuid();
  const record = {
    PartitionKey: { '_': studyUID },
    RowKey: { '_': leftPad(id, 6, 0) },
    blobKey: { '_': blobKey },
    // md5, // issue-10 Handle Checksum
  };

  batch.insertEntity(record);
  batch.insertOrMergeEntity({
    PartitionKey: { '_': studyUID },      
    RowKey: { '_': 'index' },
    index: { '_': id },
    '.metadata': { etag },
  });

  tableSvc.executeBatch(tableName, batch, (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    insertSnapshotBlob(tableName, blobKey, data, callback);
  });
}

const insertSnapshotBlob = (tableName, name, data, callback) => {
  const json = JSON.stringify(data);

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
    blobSvc.createBlockBlobFromStream(tableName, name, readStream, length, (error, response) => {
      if (error) {
        callback(error);
        return;
      }
          
      console.log(`Blob Saved ${name} Duration ${(((new Date()) - metricStartBlob) / 1000)} sec`);
      callback(null);
    });

  });
};

const lookupSnapshotBlob = (tableName, name = '', callback) => {
  const writeStream = new streamBuffers.WritableStreamBuffer();

  blobSvc.getBlobToStream(tableName, name, writeStream, (error, result, response) => {
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

const lookupProject = (tableName, studyUID, id = 0, callback) => {
  tableSvc.retrieveEntity(tableName, studyUID, leftPad(id, 6, 0), (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    callback(error, result, response);
  });
}

const queryProjects = (tableName, callback) => {
  const query = new azure.TableQuery()
    .where('RowKey eq ?', 'index');

  tableSvc.queryEntities(tableName, query, null, (error, result, response) => {
    if (error) {
      callback(error);
      return;
    }

    callback(error, result, response);
  });
}

export default (tableName = 'projects') => {
  // TODO Create table AND Blob container  if doesn't exist
  tableSvc.createTableIfNotExists(tableName, (error, result, response) => {
    if (error){
      // TODO Handle error
    }


  });

  blobSvc.createContainerIfNotExists(tableName, (error, result, response) => {
    if (error){
      // TODO Handle error
    }

  });

  return {
    getProjects: (callback = () => {}) => {
      queryProjects(tableName, (error, { entries = []}, response) => {
        const retPromises = entries.map(({ PartitionKey: { '_': PartitionKey }, index: { '_': index } }) => 
          new Promise((resolve, reject) => {
            lookupProject(tableName, PartitionKey, index, (error, { blobKey: { '_': blobKey = ''} = {} } = {}) => {
              if (error) {
                reject(error);
              }
              
              // Get Blob
              lookupSnapshotBlob(tableName, blobKey, (error, content) => {
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
      lookupLast(tableName, studyUID, (error, { index: { '_': index = 0 } = {}, '.metadata': { etag } = {} } = {}, response) => {
        insertSnapshotID(tableName, index + 1, studyUID, data, etag,  (error) => {
          console.log('Snapshot saved', error);
        });
      });
    },
  }
};
