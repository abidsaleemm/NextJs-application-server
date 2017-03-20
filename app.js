import express from 'express';
import { createStore } from 'redux';
import dicomScanDirectory from './actions/dicomScanDirectory';
import configureStore from './store/configureStore';

// Set up express server
const app = express();
const store = configureStore();

store.dispatch(dicomScanDirectory('../sample-data'));

// setInterval(() => console.log(store.getState()), 1000);

const port = process.env.PORT || 3000;
app.set('port', port);
app.use('/', express.static('./clientbundle'));

// Run server to listen on port 3000.
const server = app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// const io = require('socket.io').listen(server);
const io = require('socket.io')(8000);

// Handle socket connections
io.on('connection', socket => {
  console.log('Connection ' + socket.id);

  socket.on('action', action => {
    console.log('action', action);

    socket.emit('action', { type: 'message', data:'good day!' });
  });

  socket.on('event', function(data){ console.log('data',data) });

  socket.on('disconnect', error => {
    console.log('Disconnect ' + socket.id, error)
  });
});
