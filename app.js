import { createStore } from 'redux'
import express from 'express';

import rootReducer from './reducers';
const store = createStore(rootReducer);
const { dispatch } = store;

// Express stuff
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8080, () => {
  console.log('Example app listening on port 8080!')
})

// Server here
const io = require('socket.io')(8000);
io.on('connection', socket => {
  console.log('Connection ')
  // socket.emit('aaa', { hello: 'world' });
  socket.on('action', action => {
    dispatch(action);
    // console.log(data);
    //
  });

  socket.on('disconnect', action => {
    console.log('Disconnect')
    // dispatch(action);
    // console.log(data);
    //
  });

  // socket.on('', data => {
  //   console.log(data);
  //   //
  // });
  // socket.on('action', data => {
  //   console.log(data);
  //   //
  // });

});
