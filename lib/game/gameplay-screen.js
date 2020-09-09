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
  keys: true,
});
const questionForm = blessed.form({
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
  keys: true,
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




mainGameForm.on('submit', data => {

  mainGameForm.destroy();

  // console.log('form button click:', Object.keys(data)[0]);
  gameSocket.emit('getCategoryQuestions', Object.keys(data)[0]);
  screen.append(questionForm);
  // screen.append(mainGameForm);
  // mainGameForm.cancel();
  // screen.render();
  // need to grab all the questions from a category
  // capture all the question in an array
  // run a function that displays each quesion in order
});

gameSocket.on('database', results => {
  results.forEach((result, i) => {
    const button = blessed.button({
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
      name: result,
      inputOnFocus: true,
    });

    button.focus();
    button.on('press', () => {
      mainGameForm.submit();
    });
  });

  screen.append(scoreBoard);
  screen.append(mainGameForm);
  screen.append(boxTopRight);
  screen.append(boxBottom);
});

gameSocket.on('getCategoryQuestions', questionsAndAnswers => {
  // label for question

  const label = blessed.text({
    parent: questionForm,
    top: 1,
    left: 2,
    content: questionsAndAnswers[0].question,
    style: {
      bg: 'magenta',
    },
  });
  const buttonArray = questionsAndAnswers[0].answers.map((answObject, i) => {
    const button = blessed.button({
      parent: questionForm,
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
      left: 2,
      top: i + 5,
      content: `${i + 1}. ${answObject.answer}`,
      name: `${answObject.correct}`,
      inputOnFocus: true,
      focused: true,
    });
    button.focus();
    button.on('press', () => {
      questionForm.submit();
      questionsAndAnswers.shift();
      // questionForm.children.forEach(child => {
      //   child.detach();
      // });
      label.setContent('');
      gameSocket.emit('nextQuestion', questionsAndAnswers);
    });
    return button;
  });
  // answers will be buttons
  questionForm.on('submit', answer => {
    // screen.destroy();
    buttonArray.forEach(button => {
      button.setContent('');
    });
    questionForm.cancel();
    const label = blessed.text({
      parent: questionForm,
      top: 10,
      left: 2,
      content: Object.keys(answer)[0] === 'true' ? 'Correct!' : 'Incorrect!',
      style: {
        bg: 'yellow',
        fg: 'blue',
      },
    });
});
  

  // console.log(Object.keys(answer)[0]);
});
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


// gameSocket.on('usernamePopulate', username =>{
//   scoreBoard.setContent(username);
//   screen.render();
// });


module.exports = { screen, scoreBoard };







