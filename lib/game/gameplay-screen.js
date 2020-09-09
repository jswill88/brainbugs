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
      left: 2,
      top: i + 1,
      content: result,
      name: result,
      inputOnFocus: true,
    });

    gameSocket.emit('doneGettingCats', 'check');

    // button.focus();
    button.on('press', () => {
      mainGameForm.submit();
    });
  });
});

gameSocket.on('loadPage', () => {
  screen.append(scoreBoard);
  screen.append(boxTopRight);
  screen.append(boxBottom);
  screen.append(mainGameForm);
  mainGameForm.focus();
});

gameSocket.on('getCategoryQuestions', questionsAndAnswers => {
  // label for question
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

  screen.append(questionForm);

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
    });
    button.focus();

    button.on('press', () => {
      questionForm.submit();
      questionsAndAnswers.shift();
      label.detach();
      gameSocket.emit('nextQuestion', questionsAndAnswers);
    });

    return button;
  });
  
  questionForm.on('submit', answer => {
    buttonArray.forEach(button => {
      button.detach();
    });
    
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
});


module.exports = { screen, scoreBoard };







