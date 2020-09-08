'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

// const gameScreen = require('./start-split-screen.js');

const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

const screen = blessed.screen({
  smartCSR: true,
  //what does this mean?? maybe there are more options for this
});

screen.title = 'Brain Bugs';


//can be changed
const scoreBoard = blessed.box({
  top: '0',
  left: '0',
  width: '50%',
  height: '10%',
  content: 'placeholder',
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#0f0f0f',
    },
  },
});
//
const mainGameForm = blessed.form({
  top: '10%',
  left: '0',
  width: '50%',
  height: '55%',
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#0f0f0f',
    },
  },
  mouse: true,
  keys:true,

});

const boxTopRight = blessed.box({
  top: '0',
  right: '0',
  width: '50%',
  height: '60%',
  content: 'placeholder',
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#0f0f0f',
    },
  },
});
//
const boxBottom = blessed.box({
  bottom: '0',
  left: 'center',
  width: '100%',
  height: '40%',
  content: 'placeholder',
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#0f0f0f',
    },
  },
});

//let us exit the process while pressing q or command c
screen.key(
  ['q', 'C-c', 'escape'],
  function (ch, key) {
    return process.exit(0);
  },
);


const button1 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 1,
  content: '',
  name: '',
  inputOnFocus: true,
});
button1.focus();
button1.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button2 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 2,
  content: '',
  name: '',
  inputOnFocus: true,
});
button2.focus();
button2.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button3 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 3,
  content: '',
  name: '',
  inputOnFocus: true,
});
button3.focus();
button3.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button4 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 4,
  content: '',
  name: '',
  inputOnFocus: true,
});
button4.focus();
button4.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button5 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 5,
  content: '',
  name: '',
  inputOnFocus: true,
});
button5.focus();
button5.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button6 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 6,
  content: '',
  name: '',
  inputOnFocus: true,
});
button6.focus();
button6.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button7 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 7,
  content: '',
  name: '',
  inputOnFocus: true,
});
button7.focus();
button7.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});
const button8 = blessed.button({
  parent: mainGameForm,
  mouse: true,
  keys: true,
  shrink: true,
  style: {
    bg: 'magenta',
    focus: {
      inverse: true,
    },
  },
  height: 1,
  left: 0,
  top: 8,
  content: '',
  name: '',
  inputOnFocus: true,
});
button8.focus();
button8.on('press', data => {
  console.log('in press', data);
  mainGameForm.submit(data);
});

mainGameForm.on('submit', data => {
  screen.destroy();
  // need to grab all the questions from a category
  // capture all the question in an array
  // run a function that displays each quesion in order
  console.log('form button click:',  data);
});

gameSocket.on('database', results => {

  button1.setContent(results[0]);
  button1.name = results[0];
  button2.setContent(results[1]);
  button2.name = results[1];
  button3.setContent(results[2]);
  button3.name = results[2];
  button4.setContent(results[3]);
  button4.name = results[3];
  button5.setContent(results[4]);
  button5.name = results[4];
  button6.setContent(results[5]);
  button6.name = results[5];
  button7.setContent(results[6]);
  button7.name = results[6];
  button8.setContent(results[7]);
  button8.name = results[7];

  // button.on('press', function () {
  //   screen.destroy();
  // });
  // make function to filter categories X
  // add this to page that will render this X
  // also export part of screen that needs to be modified 
  // Reduce categories X 
  //setup radio buttons to select category
  // mainGameForm.setContent(results.join(' '));
  // radioSet.enableMouse();
  screen.append(scoreBoard);
  screen.append(mainGameForm);
  screen.append(boxTopRight);
  screen.append(boxBottom);  
});

// gameSocket.on('usernamePopulate', username =>{
//   scoreBoard.setContent(username);
//   screen.render();
// });


module.exports = {screen, scoreBoard};







