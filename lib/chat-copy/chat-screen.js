'use strict';

const blessed = require('blessed');
require('dotenv').config();

const ioClient = require('socket.io-client');
const chatSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);



const chatScreen = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs - Words with Friends',
});


chatScreen.key(['q', 'C-c','escape'], (ch, key) => process.exit(0));


const chatInputForm = blessed.form({
  parent: chatScreen,
  width: '48%',
  left: '0',
  height: '100%',
  keys: true,
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#0f0f0f',
    },
  },
});

const chatTextArea = blessed.textarea({
  parent: chatInputForm,
  top: 'center',
  height: 30,
  width: '80%',
  left: 'center',
  name: 'chat',
  inputOnFocus: true,
  vi: true,
  mouse: true,
  focus: true,
});

const sendChatButton = blessed.button({
  parent: chatInputForm,
  bottom: 1,
  left: 'center',
  name: 'submit',
  mouse: true,
  keys: true,
  shrink: true,
  content: 'Send Chat',
  style: {
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
});

const chatConvoBox = blessed.box({
  parent: chatScreen,
  width: '48%',
  right: '0',
  height: '50%',
  content: 'placeholder',
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#0f0f0f',
    },
  },
});

const chatHistoryList = blessed.list({
  parent: chatScreen,
  width: '48%',
  right: '0',
  bottom: '0',
  height: '50%',
  content: 'placeholder',
  style: {
    fg: 'white',
    bg: 'green',
    border: {
      fg: '#0f0f0f',
    },
  },
});

chatSocket.on('join', () => {
  chatScreen.append(chatInputForm);
  chatScreen.append(chatConvoBox);
  chatTextArea.focus();
});



sendChatButton.on('press', function () {
  chatInputForm.submit();
});

chatInputForm.on('submit', function(userInput) {
  let chatPayload = userInput.chat;

  chatSocket.emit('chatting', chatPayload);

  chatTextArea.clearValue();
});

// chatSocket.on('chat-input', chatPayload => {
//   chatConvoBox.setContent(chatPayload);
// });


module.exports = {chatScreen, chatConvoBox, chatHistoryList};
