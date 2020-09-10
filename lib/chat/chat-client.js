'use strict';

const ioClient = require('socket.io-client');

require('dotenv').config();

const chatScreen = require('./chat-screen.js');

const chatSocket = require('../game/socket');

chatSocket.emit('join', 'chat room');

chatScreen.chatScreen.render();

let chatUser = 'User';


chatSocket.on('chatting', chatPayload => {
  // if payload length is two, then pick the first one
  // if(typeof chatPayload === 'string') {
  //   chatScreen.chatHistoryList.addItem(`[${chatUser}]: ${chatPayload}`);
  // } else {
    chatScreen.chatHistoryList.addItem(`[${chatPayload.username}]: ${chatPayload.payload}`);
    // }
    chatScreen.chatScreen.render();
});

// get this back to what it was
chatSocket.on('usernamePopulate', username => {
  chatUser = username[0];
});

