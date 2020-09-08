'use strict';

require('blessed');
require('dotenv').config();
const ioClient = require('socket.io-client');

// const gameScreen = require('./start-split-screen.js');
const gameForm = require('./start.js');

const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

gameSocket.emit('join', 'game');

gameSocket.on('database', results => {
  results.filter()
});

gameForm.render();
// gameScreen.render();




