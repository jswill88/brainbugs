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
//

// const radioSet = blessed.radioset({
//   parent: mainGameForm,
//   width: '50%',
//   style: {
//     bg: 'cyan',
//   },
//   mouse: true,
//   keys: true,
// });



// const submit = blessed.button({
//   parent: mainGameForm,
//   top: 20,
//   left: '0',
//   name:'submit',
//   mouse: true,
//   keys: true,
//   shrink: true,
//   content: 'submit',
//   // shows when button is hightlighted
//   style: {
//     focus: {
//       inverse: true,
//     },
//   },
//   inputOnFocus: true,
// });




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

gameSocket.on('database', results => {

  // const button = blessed.button({
  //   parent: mainGameForm,
  //   mouse: true,
  //   keys: true,
  //   shrink: true,
  //   style: {
  //     bg: 'magenta',
  //     focus: {
  //       inverse: true,
  //     },
  //   },
  //   height: 1,
  //   left: 0,
  //   top: 1,
  //   content: results[0],
  //   vi: true,
  //   name: 'category',
  //   inputOnFocus: true,
  //   // checked: false,
  //   // press: true,
  // });

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
  // });
  
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







