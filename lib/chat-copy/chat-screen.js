'use strict';

const blessed = require('blessed');
require('dotenv').config();
const ioClient = require('socket.io-client');
const chatSocket = require('../game/socket');

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

const chatLabel = blessed.text({
  parent: chatInputForm,
  width: '50%',
  height: '15%',
  content: '   \n \n   Brain Bugs Chat \n  \n Press [esc] to quit', 
  left: 'center',
  top: 2,
  style: {
    bg: 'cyan',
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
  bottom: 5,
  left: 'center',
  name: 'submit',
  mouse: true,
  keys: true,
  shrink: true,
  content: '  \n   Send   \n  ',
  style: {
    bg: 'cyan',
    focus: {
      inverse: true,
      
    },
  },
  inputOnFocus: true,
});


const chatHistoryList = blessed.list({
  parent: chatScreen,
  width: '48%',
  right: '0',
  bottom: '0',
  height: '100%',
  content: 'Player 2',
  style: {
    fg: 'white',
    border: {
      fg: '#0f0f0f',
    },
  },
});

chatSocket.on('join', () => {
  chatScreen.append(chatInputForm);
  // chatScreen.append(chatConvoBox);
  chatTextArea.focus();
});


sendChatButton.on('press', function () {
  chatInputForm.submit();
});

chatInputForm.on('submit', function(userInput) {
  let payload = userInput.chat;
  let username = chatHistoryList.getContent();
  chatSocket.emit('chatting', {username, payload});

  chatTextArea.clearValue();
});


module.exports = {chatScreen,  chatHistoryList};


