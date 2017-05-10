import fs from 'fs';
import express from 'express';
import { createStore } from 'redux';
import dicomScan from './actions/dicomScan';
import dicomReadRaw from './helpers/dicomReadRaw';
import dicomReadFile from './helpers/dicomReadFile';
import dicomVolume from './helpers/dicomVolume';

import configureStore from './store/configureStore';

// Actions
import projectAdd from './actions/projectAdd';
import projectUpdate from './actions/projectUpdate';
import projectGet from './selectors/projectGet';

// Set up express server
const app = express();
const store = configureStore();

console.log('Scaning dicom files');

// issue-3
store.dispatch(dicomScan());

const { dispatch, getState } = store;
const port = process.env.PORT || 3000;
app.set('port', port);
app.use('/', express.static('./dist'));

const routes = require('./routes');
app.use('/', routes);

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
        selectSeries: () => {
          const { studyUID, seriesUID } = action;
          const { dicomImages = [] } = getState();

          const volumePromise =
            dicomVolume(dicomImages, studyUID, seriesUID);

          volumePromise.then(volume => {
            console.log('Sending volume payload');
            socket.emit('action', {
              type: 'VOLUME_SET',
              volume,
            });
          });

        },
        selectStudy: () => {
          const {
            dicomStudies,
            dicomSeries = [],
            dicomImages = [],
            projects,
          } = getState();

          const { studyUID } = action;

          if (projectGet(projects)(studyUID) === undefined) {
            console.log('Creating project', studyUID);
            dispatch(projectAdd(studyUID));
          }

          const project = projectGet(getState().projects)(studyUID);

          let { selectedSeries = '' } = project;
          const selectedDicomSeries = dicomSeries
            .filter(v => v.studyUID === studyUID);

          const { 0: {
            seriesUID: firstSeries = '',
          } = {} } = selectedDicomSeries;

          selectedSeries = selectedSeries === '' ?
            firstSeries : selectedSeries;

          console.log('selectedSeries', selectedSeries)

          const volumePromise =
            dicomVolume(dicomImages, studyUID, selectedSeries);

          volumePromise.then(volume => {
            console.log('Sending volume payload');
            socket.emit('action', {
              type: 'VOLUME_SET',
              volume,
            });
          });

          // This will merge object on client
          socket.emit('action', {
            type: 'PROJECT_PAYLOAD',
            project: {
              ...project,
              dicomSeries: dicomSeries
                .filter(v => v.studyUID === studyUID),
            },
          });
        },
      });

// TODO Move this to seperate file and cut up
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
