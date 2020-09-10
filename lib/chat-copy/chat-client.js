'use strict';

const ioClient = require('socket.io-client');

require('dotenv').config();

const chatScreen = require('./chat-screen.js');

const chatSocket = require('../game-copy/socket');

chatSocket.emit('join', 'chat room');

chatScreen.chatScreen.render();

let chatUser = 'User';


chatSocket.on('chatting', chatPayload => {
  // if(typeof chatPayload === 'string') {
  //   chatScreen.chatHistoryList.addItem(`[${chatUser}]: ${chatPayload}`);
  // } else {
  chatScreen.chatHistoryList.addItem(`[${chatPayload.username}]: ${chatPayload.payload}`);
  // }
  chatScreen.chatScreen.render();
});


chatSocket.on('usernamePopulate', username => {
  chatUser = username;
});

