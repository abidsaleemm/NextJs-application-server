import express from 'express';
import * as socketActions from './socketActions';

const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);
app.use('/', express.static('./dist'));

// Run server to listen on port 3000.
const server = app.listen(port, () => {
  console.log(`listening on *:${port}`);
  socketSetup(server);
});


const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { 
    return next(); 
  }
  
  res.redirect('/login');
};

app.get('/account', ensureAuthenticated, (req, res) => {
  res.render('account', 'Your account');
});

// TODO Move this to seperate file and cut up?
const socketSetup = (server) => {
  const io = require('socket.io').listen(server);

  // Handle socket connections
  io.on('connection', socket => {
    console.log('Connection ' + socket.id);

    socket.on('action', ({ type, ...action }) => {
      const parseType = type.replace(/^(server\/)/, ''); // TODO Do we really need this. Can just leave in and rename functions?
      console.log('action.type', parseType)

      // TODO check security token here

      const { [parseType]: socketAction = () => { } } = socketActions;
      socketAction({ socket, action });
    });

    socket.on('disconnect', error => {
      console.log('Disconnect ' + socket.id, error)
    });
  });

  return io;
};