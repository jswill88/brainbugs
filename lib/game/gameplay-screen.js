'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

const gameSocket = require('./socket.js');
let scoreCounter = 0;

const screen = blessed.screen({
  smartCSR: true,
});

screen.title = 'Brain Bugs';

// DISPLAY USER NAMES ON SCOREBOARD
const nameBoard = blessed.list({
  top: '1',
  left: '0',
  width: '60%',
  height: 4,
  content: '    Waiting for other players...',
  border: {
    type: 'line',
    bold: true,
  },
  style: {
    fg: 'yellow',
    bg: 'black',
    border: {
      fg: '#0f0f0f',
    },
  },
});

// DISPLAY USER SCORE ON SCOREBOARD
const scoreBoard = blessed.list({
  top: '1',
  left: '60%',
  width: '40%',
  height: 4,
  content: '   0',
  border: {
    type: 'line',
  },
  style: {
    fg: 'yellow',
    bg: 'black',
    border: {
      fg: '#0f0f0f',
    },
  },
});
//
const mainGameForm = blessed.form({
  top:4,
  left: 'center',
  width: '100%',
  height: '70%',
  content: '                                    Please select a category below',
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


screen.key(
  ['q', 'C-c', 'escape'],
  function (ch, key) {
    return process.exit(0);
  },
);


mainGameForm.on('submit', data => {
  mainGameForm.destroy();
  gameSocket.emit('getCategoryQuestions', Object.keys(data)[0]);
});
// DISPLAYS CATEGORIES FROM DATABASE
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
      height: 5,
      left: 'center',
      top: i + 2,
      content: result,
      name: result,
      inputOnFocus: true,
    });


    gameSocket.emit('doneGettingCats', 'check');

  
    button.on('press', () => {
      mainGameForm.submit();
    });
  });
});

gameSocket.on('loadPage', () => {
  screen.append(nameBoard);
  screen.append(scoreBoard);
  screen.append(mainGameForm);
  mainGameForm.focus();
});


gameSocket.on('scoreIncrease', userArr => {
  scoreBoard.popItem();
  scoreBoard.popItem();

  scoreBoard.addItem(userArr[0].score.toString());
  scoreBoard.addItem(userArr[1].score.toString());
});



gameSocket.on('getCategoryQuestions', questionsAndAnswers => {
  const questionForm = blessed.form({
    top:4,
    left: 'center',
    width: '100%',
    height: '70%',
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
    });

    return button;
  });


  questionForm.on('submit', answer => {
    buttonArray.forEach(button => {
      button.detach();
    });

    label.detach();

    questionsAndAnswers.shift();

    if(Object.keys(answer)[0] === 'true'){
      scoreCounter++;
      gameSocket.emit('nextQuestion', questionsAndAnswers);
    } 

    if(Object.keys(answer)[0] === 'false'){
      gameSocket.emit('wrongAnsEvent', questionsAndAnswers);
    }
  });
  if(questionsAndAnswers.length === 0) {
    questionForm.detach();
  }
});

module.exports = { screen, scoreBoard: nameBoard };


const endGameForm = blessed.form({
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'yellow',
    border: {
      fg: '#0f0f0f',
    },
  },
  mouse: true,
  keys: true,
});


const gameOver = blessed.text({
  top: 1,
  left: 'center',
  content: ' {bold}Game Over{/bold} ',
  tags: true,
});

const winnerName = blessed.text({
  top: 5,
  left: 'center',
  height: '25%',
  width: '70%', 

  content: `The winner is $ for now`,
});


const exitGame = blessed.button({
  top: 20,
  left: 'center',
  name: 'kill',
  mouse: true,
  keys: true,
  shrink: true,
  content: 'Press \'escape\' to end game',
  style: {
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
});

exitGame.on('press', function () {
  endGameForm.submit();
  screen.destroy();
  console.log('thank you for playing');
});



gameSocket.on('afterEndRender', winner => {
  
  mainGameForm.set('width',0);
  mainGameForm.set('height',0);
  nameBoard.set('width', 0);
  nameBoard.set('height',0);
  screen.remove(nameBoard);
  winnerName.setContent(`\n \n \n      Congratulations, ${winner} is the winner`);
  screen.append(endGameForm);
  endGameForm.append(gameOver);
  endGameForm.append(winnerName);
  endGameForm.append(exitGame);
  endGameForm.setFront();
  screen.render();
});







