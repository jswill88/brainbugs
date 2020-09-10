// 'use strict';

// //make the end screen
// //show the scores
// //show the winner
// const blessed = require('blessed');
// const ioClient = require('socket.io-client');
// require('dotenv').config();

// // const gameScreen = require('./start-split-screen.js');

// const endSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

// // endSocket.on('join', 'end socket joined the room');

// const screen = blessed.screen({
//   smartCSR: true,
// });
// // screen.title = 'Brain Bugs';



// screen.key(
//   ['q', 'C-c', 'escape'],
//   function (ch, key) {
//     return process.exit(0);
//   },
// );

// const endGameForm = blessed.form({
//   top: '10%',
//   left: '0',
//   width: '50%',
//   height: '55%',
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
//   mouse: true,
//   keys: true,
// });

// //make the end screen

// //make them as labels
// //show the scores
// //show the winner

// const gameOver = blessed.text({
//   // parent: endGameForm,
//   top: 1,
//   left: 'center',
//   content: ' game over ',
// });




// //need to export the username from the correct file
// const winnerName = blessed.text({
//   // parent: endGameForm,
//   top:5,
//   left: 'center',
// //when the pages are connected we will have to put them on the page. 
// //We are also referencing this in line 22 of the game-client file. 
//   content: `The winner is $ for now`,
// });

// const scoreOne = blessed.text({
//   // parent: endGameForm,
//   top: 10,
//   left: 'left',
//   // content: `Score ${scorePlayerOne}`,
//   content: `Placeholder 1`,
// });

// const scoreTwo = blessed.text({
//   // parent: endGameForm,
//   top: 10,
//   left: 'center',
//   // content: `Score ${scorePlayerTwo}`,
//   content: `Placeholder 2`,
// });

// const playAgain = blessed.button({
//   // parent: endGameForm,
//   top: 15,
//   left: 'center',
//   name:'submit',
//   mouse: true,
//   keys: true,
//   shrink: true,
//   content: 'play again',
//   style: {
//     focus: {
//       inverse: true,
//     },
//   },
//   inputOnFocus: true,
//   // vi: true,
// });

// playAgain.on('press', function () {
//   endGameForm.submit();
//   screen.destroy();
//   // const game = require('./gameplay-screen');
//   console.log('before the append');
//   // screen.append(game);
//   console.log('before the render');
//   // game.render();
//   console.log('after the render');
// });

// const exitGame = blessed.button({
//   // parent: endGameForm,
//   top: 20,
//   left: 'center',
//   name:'kill',
//   mouse: true,
//   keys: true,
//   shrink: true,
//   content: 'end game',
//   style: {
//     focus: {
//       inverse: true,
//     },
//   },
//   inputOnFocus: true,
//   // vi: true,
// });

// exitGame.on('press', function () {
//   endGameForm.submit();
//   screen.destroy();
//   //insert amazing picture here later.
//   console.log('thank you for playing');
// });


// endSocket.on('afterEndRender', () => {
//   console.log('in after end render on end page ');
//   screen.append(endGameForm);
//   endGameForm.append(gameOver);
//   endGameForm.append(winnerName);
//   endGameForm.append(scoreOne);
//   endGameForm.append(scoreTwo);
//   endGameForm.append(playAgain);
//   endGameForm.append(exitGame);
// });
// // screen.render();

// module.exports = screen;