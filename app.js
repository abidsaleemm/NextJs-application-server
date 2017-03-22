import fs from 'fs';
import express from 'express';
import { createStore } from 'redux';
import dicomScanDirectory from './actions/dicomScanDirectory';
import dicomReadImage from './helpers/dicomReadImage';
import { readFile } from './helpers/dicomReadAzureFiles';
import configureStore from './store/configureStore';

import projectAdd from './actions/projectAdd';
import projectGet from './selectors/projectGet';

// Set up express server
const app = express();
const store = configureStore();

console.log('Scaning dicom directory')
store.dispatch(dicomScanDirectory('../sample-data'));
console.log('Scaning dicom directory Done.')

const { dispatch, getState } = store;

const port = process.env.PORT || 3000;
app.set('port', port);
app.use('/', express.static('./dist'));

// Run server to listen on port 3000.
const server = app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const processActions = (
  {
    ...store,
    dispatch,
    getState
  },
  action,
  socket
) =>
    (o => (o[action.type] || (() => []))())({
        studies: () => {
          const { dicomStudies = [] } = getState();

          // TODO Check if project created

          socket.emit('action', {
            type: 'STUDIES',
            studies: dicomStudies,
          });
        },
        selectStudy: () => {
          const {
            dicomStudies,
            dicomImages = [],
            projects,
          } = getState();

          const { studyUID } = action;
          if (projectGet(projects)(studyUID) === undefined) {
            console.log('Creating project', studyUID);
            dispatch(projectAdd(studyUID));
          }

          const project = projectGet(getState().projects)(studyUID);

          dicomImages
            .filter(v => v.studyUID === studyUID)
            .forEach(({ directory, file }) => {
              readFile(directory, file, (err, actionData) => {
                socket.emit('action', {
                  type: 'DICOM_DATA',
                  ...actionData,
                });
              });
            })

          const { discs, vertebra, segments } = project;

          // Send all init actions
          socket.emit('action', {
            type: 'SPINE_SEGMENTS',
            segments,
          });

          socket.emit('action', {
            type: 'SPINE_VERTEBRA',
            vertebra,
          });

          socket.emit('action', {
            type: 'SPINE_DISCS',
            discs,
          });

          // Send StudyUID
          socket.emit('action', {
            type: 'STUDY_SELECT',
            studyUID,
          });
        },
      });

const io = require('socket.io').listen(server);

// Handle socket connections
io.on('connection', socket => {
  console.log('Connection ' + socket.id);

  socket.on('action', (action) => {
    action.type = action.type.replace(/^(server\/)/, '');
    console.log('action.type', action.type)
    processActions(store, action, socket);

    // socket.emit('action', processActions(store, action));
  });

  socket.on('disconnect', error => {
    console.log('Disconnect ' + socket.id, error)
  });
});
