import fs from 'fs';
import express from 'express';
import { createStore } from 'redux';
import dicomScan from './actions/dicomScan';
import dicomReadRaw from './helpers/dicomReadRaw';
import dicomReadFile from './helpers/dicomReadFile';
import configureStore from './store/configureStore';

import projectAdd from './actions/projectAdd';
import projectUpdate from './actions/projectUpdate';
import projectGet from './selectors/projectGet';

// Set up express server
const app = express();
const store = configureStore();

console.log('Scaning dicom files')
store.dispatch(dicomScan());

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
        projectState: () => {
          const { payload } = action;
          dispatch(projectUpdate(payload));
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

          // issue-2
          // Create a sperate way
          dicomImages
            .filter(v => v.studyUID === studyUID)
            .forEach(({ directory, file }) => {
              dicomReadFile(directory, file, (err, actionData) => {
                socket.emit('action', {
                  type: 'DICOM_DATA',
                  ...actionData,
                });
              });
            })

          // This will merge object on client
          socket.emit('action', {
            type: 'PROJECT_PAYLOAD',
            project,
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
  });

  socket.on('disconnect', error => {
    console.log('Disconnect ' + socket.id, error)
  });
});
