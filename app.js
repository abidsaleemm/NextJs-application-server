const express = require('express');
const rootReducer =require('./reducers');
const store = createStore(rootReducer);
const { dispatch } = store;
const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.get('/', (req, res) => {
  res.send('Hello World from express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

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
