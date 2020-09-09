'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

// const gameScreen = require('./start-split-screen.js');

const chatSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

const screen = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs',

});

screen.key(['q', 'C-c','escape'], (ch, key) => process.exit(0));

const chatForm = blessed.form({
  parent: screen,
  width: '50%',
  left: '0',
  keys: true,
  vi: true,
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg:'#0f0f0f',
    },
  },
});

const label = blessed.text({
  parent: screen,
  top: 1,
  left: '0',
  content: '  Welcome to Brain Bugs   ',
  
});

const textBox = blessed.textarea({
  parent: chatForm,
  top: 5,
  height: 5,
  left: 'center',
  name: 'chat',
  inputOnFocus: true,
  vi: true,

});
textBox.focus();

const chatSubmit = blessed.button({
  parent: chatForm,
  top: 20,
  left: 'center',
  name:'chatSubmit',
  mouse: true,
  keys: true,
  shrink: true,
  content: 'chat',
  // shows when button is hightlighted
  style: {
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
  // vi: true,
});

chatSubmit.on('press', function () {
  chatForm.submit();
});

chatForm.on('submit', function(data) {
  // screen.destroy();
  // console.log('DATA FROM CHAT:', data.chat);
  chatSocket.emit('chat-appender', data.chat);

});

const chatWindow = blessed.box({
  top: '0',
  right: '0',
  width: '50%',
  height: '100%',
  content: 'placeholder',
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg:'#0f0f0f',
    },
  },
});



screen.append(chatWindow);
screen.append(chatForm);
screen.append(label);
screen.render();

module.exports = {screen, chatWindow};
