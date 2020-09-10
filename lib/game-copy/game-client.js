'use strict';

require('blessed');
require('dotenv').config();
const ioClient = require('socket.io-client');


const gameScreen = require('./gameplay-screen.js');
const gameForm = require('./start.js');
// const endForm = require('./end-screen');

const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

gameSocket.emit('join', 'game');


gameForm.render();

gameSocket.on('usernamePopulate', username => {
  console.log('username populate copy');
  gameForm.destroy();
  gameScreen.scoreBoard.setContent(username);
  gameScreen.screen.render();
  // endForm.winnerName.setContent(`The winner is ${username}`);
});

gameSocket.on('gameEnd', () => {
  // console.log('in game client on game end');
  // endForm.render();
  // gameScreen.destroy();
  gameSocket.emit('afterEndRender');
});




