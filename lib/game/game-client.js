'use strict';

require('blessed');
require('dotenv').config();
const ioClient = require('socket.io-client');


const gameScreen = require('./gameplay-screen.js');
const gameForm = require('./start.js');

const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

gameSocket.emit('join', 'game');


gameForm.render();

gameSocket.on('usernamePopulate', username => {
  gameForm.destroy();
  gameScreen.scoreBoard.setContent(username);
  gameScreen.screen.render();
});




