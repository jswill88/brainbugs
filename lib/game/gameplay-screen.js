'use strict';

const blessed = require('blessed');
const ioClient = require('socket.io-client');
require('dotenv').config();

// const gameScreen = require('./start-split-screen.js');
const gameSocket = require('./socket.js')
// const gameSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

const screen = blessed.screen({
  smartCSR: true,
  //what does this mean?? maybe there are more options for this
});

screen.title = 'Brain Bugs';


//can be changed
const scoreBoard = blessed.list({
  top: '0',
  left: '0',
  width: '50%',
  height: 4,
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
    bg: 'cyan',
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
  content: 'this is the box bottom',
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'green',
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
    // screen.destroy();
    console.log('in database before calling done getting cats');
    gameSocket.emit('doneGettingCats', 'check');

    // button.focus();
    button.on('press', () => {
      mainGameForm.submit();
    });
  });
});

gameSocket.on('loadPage', () => {
  console.log('made it to load page event in game');
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

    // const label = blessed.text({
    //   parent: questionForm,
    //   top: 10,
    //   left: 2,
    //   content: Object.keys(answer)[0] === 'true' ? 'Correct!' : 'Incorrect!',
    //   style: {
    //     bg: 'yellow',
    //     fg: 'blue',
    //   },
    // });
  });
  if(questionsAndAnswers.length === 1) {
    questionForm.detach();
  }
});


module.exports = { screen, scoreBoard };


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

//make the end screen

//make them as labels
//show the scores
//show the winner

const gameOver = blessed.text({
  // parent: endGameForm,
  top: 1,
  left: 'center',
  content: ' game over ',
});




//need to export the username from the correct file
const winnerName = blessed.text({
  // parent: endGameForm,
  top: 5,
  left: 'center',
  //when the pages are connected we will have to put them on the page. 
  //We are also referencing this in line 22 of the game-client file. 
  content: `The winner is $ for now`,
});

const scoreOne = blessed.text({
  // parent: endGameForm,
  top: 10,
  left: 'left',
  // content: `Score ${scorePlayerOne}`,
  content: `Placeholder 1`,
});

const scoreTwo = blessed.text({
  // parent: endGameForm,
  top: 10,
  left: 'center',
  // content: `Score ${scorePlayerTwo}`,
  content: `Placeholder 2`,
});

const playAgain = blessed.button({
  // parent: endGameForm,
  top: 15,
  left: 'center',
  name: 'submit',
  mouse: true,
  keys: true,
  shrink: true,
  content: 'play again',
  style: {
    focus: {
      inverse: true,
    },
  },
  inputOnFocus: true,
  // vi: true,
});

playAgain.on('press', function () {
  endGameForm.submit();
  screen.destroy();
  // const game = require('./gameplay-screen');
  console.log('before the append');
  // screen.append(game);
  console.log('before the render');
  // game.render();
  console.log('after the render');
});

const exitGame = blessed.button({
  // parent: endGameForm,
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
  // vi: true,
});

exitGame.on('press', function () {
  endGameForm.submit();
  screen.destroy();
  //insert amazing picture here later.
  console.log('thank you for playing');
});

gameSocket.on('afterEndRender', () => {
  // console.log('in after end render on end page ');
  // mainGameForm.detach();
  mainGameForm.set('width',0);
  mainGameForm.set('height',0);
  boxBottom.set('width', 0);
  boxBottom.set('height',0);
  boxBottom.detach();
  boxTopRight.set('width',0);
  boxTopRight.set('height',0);
  boxTopRight.detach();
  scoreBoard.set('width', 0);
  scoreBoard.set('height',0);
  screen.remove(scoreBoard);
  screen.remove(boxBottom);
  // screen.destroy();

  screen.append(endGameForm);
  endGameForm.append(gameOver);
  endGameForm.append(winnerName);
  endGameForm.append(scoreOne);
  endGameForm.append(scoreTwo);
  endGameForm.append(playAgain);
  endGameForm.append(exitGame);
  endGameForm.setFront();
  screen.render();


});







