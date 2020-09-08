//Connect mongo and start the server and the entry point for the app
'use strict';

const server = require('./src/server/server.js');
require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const socketIO = require('socket.io');
const INDEX = '/index.html';


const MONGODB_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const socketServer = server.app
  .use((req,res) => res.sendFile( INDEX, { root: __dirname } ))
  .listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));


mongoose.connect(MONGODB_URI, mongooseOptions);


const io = socketIO(socketServer);
// server.start(process.env.PORT);

io.on('connection', (socket) => {
  // console.log('socket', socket);
  socket.on('join', room => {
    console.log('joined', room);
    socket.join(room);
  });
});

module.exports = io;

