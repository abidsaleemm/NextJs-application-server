const routes = require('express').Router();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var azure = require('azure-storage');
var zlib = require('zlib');
var streamBuffers = require('stream-buffers');

process.env.AZURE_STORAGE_ACCOUNT = 'multus';
process.env.AZURE_STORAGE_ACCESS_KEY = 'w9Qei6eOoqerSmw9msraYn6nNx45lr1++8EzvAnpKCib87pMGe4uhl/IszsJsTOY006XG68AFGER3nGmBjLElQ==';

const tableSvc = azure.createTableService();
const blobSvc = azure.createBlobService();

// routes.get('/test', function (req, res) {
//   res.send('Test');
// });

routes.get('/getProjects/:tableName/:selectors*?', function(req, res) {
    const tableName = req.params.tableName;
    const selectorsInput = req.params.selectors;
    var selectors = [];
    if (selectorsInput != null) {
        selectors = selectorsInput.split("+");
    }
    const query = new azure.TableQuery()
        .where('RowKey eq ?', 'index')
        .select(selectors);

    tableSvc.queryEntities(tableName, query, null, function(error, result, response) {
        if (!error) {
            res.send(result.entries);
        }
    });
});

routes.get('/getProject/:tableName/:projectid/:selectors*?', function(req, res) {
    const tableName = req.params.tableName;
    const projectQuery = req.params.projectid;
    const selectorsInput = req.params.selectors;
    var selectors = [];
    if (selectorsInput != null) {
        selectors = selectorsInput.split("+");
    }
    const query = new azure.TableQuery()
        .where('PartitionKey eq ?', projectQuery)
        .select(selectors);

    tableSvc.queryEntities(tableName, query, null, function(error, result, response) {
        if (!error) {
            //TODO: Add results.
            res.send(result.entries);
        }
    });
});

routes.get('/getProjectSnapshot/:tableName/:projectid', function(req, res) {
    var indexForBlob;
    const tableName = req.params.tableName;
    const projectQuery = req.params.projectid;
    const query = new azure.TableQuery()
        .where('PartitionKey eq ?', projectQuery)
        .and('RowKey eq ?', 'index');
    //.select(['blobKey', 'RowKey']);

    tableSvc.queryEntities(tableName, query, null, function(error, result, response) {
        if (!error) {
            indexForBlob = result.entries[0]['index']['_'];
            const tempStr = indexForBlob.toString();
            var numOfZeros = 6 - indexForBlob.toString().length;
            var projectQuery2 = ('000000' + tempStr).substr(-6);

            const query2 = new azure.TableQuery()
                .where('RowKey eq ?', projectQuery2);

            tableSvc.queryEntities(tableName, query2, null, function(error, result, response) {
                if (!error) {
                    const blobKey = result.entries[0]['blobKey']['_'];

                    const writeStream = new streamBuffers.WritableStreamBuffer();

                    blobSvc.getBlobToStream('projects', blobKey, writeStream, (error, result, response) => {
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
                            const reverse = JSON.stringify(parsed)
                            res.send(reverse);
                        });
                    });

                }
            });

        }
    });
});

// lists blobs in a container 
routes.get('/getBlobList', function(req, res) {
    blobSvc.listBlobsSegmented('projects', null, function(error, blobs, result) {
        res.send({ title: 'List of Blobs', serverBlobs: blobs.entries });
    });
});

// list of blobs with a specific prefix
routes.get('/getBlobListByPrefix', function(req, res) {
    var prefix = '-';
    blobSvc.listBlobsSegmentedWithPrefix('projects', '4b7ea6a3-a61b-4600-bf99-b2899647f44e', null, function(error, blobs, result) {
        res.send({ title: 'List of Blobs', serverBlobs: blobs.entries });
    });
});

routes.get('/getSnapshotBlob', function(req, res) {
    const writeStream = new streamBuffers.WritableStreamBuffer();

    blobSvc.getBlobToStream('projects', '20d8f287-3e66-4b34-a730-2185bda84c8f', writeStream, (error, result, response) => {
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
            res.send(parsed);
            // callback(null, parsed);
        });
    });
});

module.exports = routes;