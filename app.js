const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})

// #!/usr/bin/env node

/**
 * Module dependencies.
 */

 // import express from 'express';
 // // import http from 'http';
 //
 // import rootReducer from './reducers';
 // const store = createStore(rootReducer);
 // const { dispatch } = store;
 //
 // // Express stuff
 // const app = express();

// var app = require('../app');
// var debug = require('debug')('nodejs-get-started:server');
// var http = require('http');
//
// /**
//  * Get port from environment and store in Express.
//  */
//
// var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
//
// /**
//  * Create HTTP server.
//  */
//
// var server = http.createServer(app);
//
// /**
//  * Listen on provided port, on all network interfaces.
//  */
//
// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);
//
// /**
//  * Normalize a port into a number, string, or false.
//  */
//
// function normalizePort(val) {
//   var port = parseInt(val, 10);
//
//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }
//
//   if (port >= 0) {
//     // port number
//     return port;
//   }
//
//   return false;
// }
//
// /**
//  * Event listener for HTTP server "error" event.
//  */
//
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }
//
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;
//
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }
//
// /**
//  * Event listener for HTTP server "listening" event.
//  */
//
// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

// import { createStore } from 'redux'
// import express from 'express';
// // import http from 'http';
//
// import rootReducer from './reducers';
// const store = createStore(rootReducer);
// const { dispatch } = store;
//
// // Express stuff
// const app = express();
// const port = process.env.PORT || 3000;
//
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
//
// // const port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);
//
// app.listen(port, () => {
//   // console.log(`Example app listening on port ${port}`);
// })

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
