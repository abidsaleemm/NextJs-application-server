import { createStore } from 'redux'
import express from 'express';

import rootReducer from './reducers';
const store = createStore(rootReducer);
const { dispatch } = store;

// Express stuff
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`);
})

// // Server here
// const io = require('socket.io')(8000);
// io.on('connection', socket => {
//   console.log('Connection ')
//   // socket.emit('aaa', { hello: 'world' });
//   socket.on('action', action => {
//     dispatch(action);
//     // console.log(data);
//     //
//   });
//
//   socket.on('disconnect', action => {
//     console.log('Disconnect')
//     // dispatch(action);
//     // console.log(data);
//     //
//   });
//
//   // socket.on('', data => {
//   //   console.log(data);
//   //   //
//   // });
//   // socket.on('action', data => {
//   //   console.log(data);
//   //   //
//   // });
//
// });
