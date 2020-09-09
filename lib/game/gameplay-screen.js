'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

// const gameScreen = require('./start-split-screen.js');

const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);



console.log('--------------------- STUFF  -------------------');

 
const screen = blessed.screen({
  smartCSR: true,
  //what does this mean?? maybe there are more options for this
});

screen.title = 'Brain Bugs';

// const {boxTopRight} = require('../chat/chat-screen.js');
// const {formBottom} = require('../chat/chat-screen.js');


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
  // content: 'placeholder',
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




// --------------- TO DO ---------------
// use setContent property here with chat functionality 

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





// created a box to hold the form which holds the textarea
// const boxBottom = blessed.box({
//   bottom: '0',
//   left: 'center',
//   width: '90%',
//   height: '40%',
//   border: {
//     type: 'line',
//   },
//   style: {
//     fg: 'white',
//     bg: 'magenta',
//     border: {
//       fg: '#0f0f0f',
//     },
//   },
// });



const formBottom = blessed.form({
  parent: screen,
  width: '100%',
  top: '65%',
  left: 'center',
  // content: 'placeholder',
  keys: true,
  // vi: true,
  // border: {
  //   type: 'line',
  // },
  style: {
    fg: 'white',
    bg: 'blue',
    border: {
      fg: '#0f0f0f',
    },
  },
});

const chatInput = blessed.textarea({
  parent: formBottom,
  top: 5,
  height: 5,
  left: 'center',
  name: 'chat',
  inputOnFocus: true,
  vi: true,
  style: {
    bg: 'green',
    border: {
      fg: '#0f0f0f',
    },
    focus: {
      inverse: true,
    },
  },

});
chatInput.focus();


//let us exit the process while pressing q or command c
screen.key(
  ['q', 'C-c', 'escape'],
  function (ch, key) {
    return process.exit(0);
  },
);

gameSocket.on('database', results => {


  let buttonArray = results.map((result,i) => {
    return blessed.button({
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
      top: i,
      content: result,
      vi: true,
      name: 'category',
      inputOnFocus: true,
      // checked: false,
      // press: true,
    });
    // radioButton.focus();
  });

  screen.append(scoreBoard);
  screen.append(mainGameForm);
  screen.append(boxTopRight);
  // boxBottom.append(formBottom);  
  // screen.append(formBottom);  

});

// gameSocket.on('usernamePopulate', username =>{
//   scoreBoard.setContent(username);
//   screen.render();
// });


module.exports = {screen, scoreBoard};







