'use strict';

const ioClient = require('socket.io-client');


require('dotenv').config();
// require('./chat-screen.js');

const chatSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

chatSocket.emit('join', 'chat room');

// function renderChat() {
  
chatSocket.on('chat-appender', async (chatPayload) => {
  
  //we're taking the payload from the chat input, we want to it
  
  console.log('CHAT PAYLOAD: ', chatPayload);
  
  
  // BEFORE DOING THE BELOW, WE'RE GETTING THE PAYLOAD BUT WHEN WE REQUIRE THE SCREEN IT TAKES OVER THE CONSOLE
  
  
  const chatScreen = require('./chat-screen.js');
  chatScreen.chatWindow.setContent(chatPayload);
  await chatScreen.screen.render();


});

// }

// renderChat();

