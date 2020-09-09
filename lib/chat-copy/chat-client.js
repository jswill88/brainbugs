'use strict';

const ioClient = require('socket.io-client');

require('dotenv').config();

const chatScreen = require('./chat-screen.js');

const chatSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

chatSocket.emit('join', 'chat room');

chatScreen.chatScreen.render();

let chatUser = 'User';


// WE CAN GET CHAT PAYLOAD, TRYING TO ASSOCIATE USERNAME WITH IT


chatSocket.on('chatting', chatPayload => {
  
  chatScreen.chatHistoryList.addItem(`[${chatUser}]: ${chatPayload}`);
  chatScreen.chatScreen.render();
  
});




chatSocket.on('usernamePopulate', username => {

  chatUser = username;
  
});