'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

gameSocket.emit('join', 'game');


// ------------------ START SCREEN -------------------------------
// ------- renders with focus on textarea, pops focus off when submitted

const screenStart = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs',
});

const form = blessed.form({
  parent: screenStart,
  width: '90%',
  left: 'center',
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
  parent: screenStart,
  top: 1,
  left: 'center',
  content: '  Welcome to Brain Bugs   ',
  
});

const textBox = blessed.textarea({
  parent: form,
  top: 5,
  height: 5,
  left: 'center',
  name: 'username',
  inputOnFocus: true,
  vi: true,

});
textBox.focus();

const submit = blessed.button({
  parent: form,
  top: 20,
  left: 'center',
  name:'submit',
  mouse: true,
  keys: true,
  shrink: true,
  content: 'submit',
  style: {
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
});

submit.on('click', function (data) {
  // form.submit();
  gameSocket.emit('usernamePopulate', data.username);
  textBox.focusPop();
  screenStart.destroy();
  // screenGame.render();
});

// form.on('submit', function(data) {
// });

screenStart.key(['q', 'C-c','escape'], (ch, key) => process.exit(0));

screenStart.append(form);
screenStart.append(label);
// screenStart.render();


// ------------- EVENT LISTENER TO MOVE TO NEXT SCREEN, GAMEPLAY -----------------

gameSocket.on('usernamePopulate', username => {
  // screenStart.destroy();
  scoreBoard.setContent(username);
  chatInput.focus();
});

// --------------------------------------------------------------------------------












const screenGame = blessed.screen({
  smartCSR: true,
  title: 'Brain Bugs Game Play',
});


const scoreBoard = blessed.box({
  // parent: screenGame,
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


const mainGameForm = blessed.form({
  // parent: screenGame,
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


const boxTopRight = blessed.box({
  // parent: screenGame,
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



const formBottom = blessed.form({
  // parent: screenGame,
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

// formBottom.on('click', function() {

//   chatInput.focus();
// });

// chatInput.focus();




//let us exit the process while pressing q or command c
screenGame.key(
  ['q', 'C-c', 'escape'],
  function (ch, key) {
    return process.exit(0);
  },
);

// gameSocket.on('database', results => {


//   let buttonArray = results.map((result,i) => {
//     return blessed.button({
//       parent: mainGameForm,
//       mouse: true,
//       keys: true,
//       shrink: true,
//       style: {
//         bg: 'magenta',
//         focus: {
//           inverse: true,
//         },
//       },
//       height: 1,
//       left: 0,
//       top: i,
//       content: result,
//       vi: true,
//       name: 'category',
//       inputOnFocus: true,
//       // checked: false,
//       // press: true,
//     });
//     // radioButton.focus();
//   });

// });


screenGame.append(scoreBoard);
screenGame.append(mainGameForm);
screenGame.append(boxTopRight);
screenGame.append(formBottom);  
