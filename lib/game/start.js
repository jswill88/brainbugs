'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

// const gameScreen = require('./gameplay-screen.js');
const startSocket = require('./socket.js');
// const startSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

startSocket.emit('join', 'game');

const screen = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs',
});

const form = blessed.form({
  parent: screen,
  width: '90%',
  left: 'center',
  keys: true,
  // mouse: true,
  // vi: true,
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
  left: 'center',
  height: 3,
  width: 25,
  style :{
    bg: 'cyan',
    fg: 'white',
   
  },
  tags: true,
  content: '  \n  {bold}Welcome to Brain Bugs{/bold}   ',
  
});

const textBox = blessed.textarea({
  parent: form,
  top: 17,
  height: 5,
  left: 'center',
  name: 'username',
  inputOnFocus: true,
  vi: true,
  mouse: true,
  focus: true,
  // keys: true,
});

const gameRules = blessed.text({
  parent: form,
  top: 8,
  content: '{bold}How to play..{/bold} \n - Enter your name below & click start game \n - Pick a category to start game \n - The player who choses the correct answer first gets the point \n - Use tab or the arrow keys to select the answer \n - Use enter to submit',
  left: 'center',
  style: {
    bg: 'yellow',
  },
  width: '70%',
  tags: true,
});


const submit = blessed.button({
  parent: form,
  top: 25,
  height: 4,
  width: 15,
  left: 'center',
  name:'submit',
  mouse: true,
  keys: true,
  shrink: true,
  tags: true,
  content: ' \n     {bold}Start \n     Game{/bold}',
  style: {
    bg: 'cyan',
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
  // vi: true,
});

submit.on('press', function () {
  form.submit();
});

startSocket.on('join', () => {
  screen.key(['q', 'C-c','escape'], (ch, key) => process.exit(0));
  screen.append(form);
  screen.append(label);
  textBox.focus();
});

form.on('submit', function(data) {
  startSocket.emit('usernamePopulate',data.username);
  screen.destroy();
  
});


module.exports = screen;



