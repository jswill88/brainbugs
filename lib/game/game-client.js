'use strict';

require('blessed');
require('dotenv').config();
require('socket.io-client');


const gameScreen = require('./gameplay-screen.js');
const gameForm = require('./start.js');
// const endForm = require('./end-screen');
const gameSocket = require('./socket.js');
// const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

gameSocket.emit('join', 'game');


gameForm.render();

gameSocket.on('usernamePopulate', usernameArr => {


  gameForm.destroy();


  gameScreen.scoreBoard.addItem(usernameArr[0]);
  gameScreen.scoreBoard.addItem(usernameArr[1]);

  gameScreen.screen.render();
});

gameSocket.on('gameEnd', () => {
  // console.log('in game client on game end');
  // endForm.render();
  // gameScreen.destroy();
  gameSocket.emit('afterEndRender');
});


// module.exports 

