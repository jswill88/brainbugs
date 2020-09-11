'use strict';

require('socket.io-client');
require('dotenv').config();
const chatScreen = require('./chat-screen.js');
const chatSocket = require('../game/socket');
chatSocket.emit('join', 'chat room');
chatScreen.chatScreen.render();

chatSocket.on('chatting', chatPayload => {
  chatScreen.chatHistoryList.addItem(`[${chatPayload.username}]: ${chatPayload.payload}`);
  chatScreen.chatScreen.render();
});
