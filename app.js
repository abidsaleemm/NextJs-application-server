const express = require('express');
// import express from 'express';
const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

// TODO server static
app.get('/', (req, res) => {
  res.send('Hello World from express! 3')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// node -r babel-register

// // Server here
const io = require('socket.io')(8000);
io.on('connection', socket => {
  console.log('Connection ')
  // socket.emit('aaa', { hello: 'world' });
  socket.on('action', action => {
    // dispatch(action);
    console.log('action', action);
    //
  });

  socket.on('disconnect', action => {
    console.log('Disconnect', action)
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
