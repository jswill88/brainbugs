'use strict';

require('blessed');
require('dotenv').config();
require('socket.io-client');

const gameScreen = require('./gameplay-screen.js');
const gameForm = require('./start.js');
const gameSocket = require('./socket.js');

gameSocket.emit('join', 'game');

gameForm.render();

gameSocket.on('usernamePopulate', usernameArr => {
  gameForm.destroy();

  gameScreen.scoreBoard.addItem(usernameArr[0]);
  gameScreen.scoreBoard.addItem(usernameArr[1]);

  gameScreen.screen.render();
});

gameSocket.on('gameEnd', () => {
  gameSocket.emit('afterEndRender');
});


// module.exports 

