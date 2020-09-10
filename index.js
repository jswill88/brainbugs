//Connect mongo and start the server and the entry point for the app
'use strict';

const server = require('./src/server/server.js');
require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const socketIO = require('socket.io');
const INDEX = '/index.html';


const MONGODB_URI = process.env.MONGODB_URI;

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const socketServer = server.app
  .use((req,res) => res.sendFile( INDEX, { root: __dirname } ))
  .listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));


mongoose.connect(MONGODB_URI, mongooseOptions);


const io = socketIO(socketServer);
// server.start(process.env.PORT);

const thisIsTheSchema = require('./lib/database/schema/question-schema');

let userArr = [];

const wrongAnsArr = [];

// if there are 2 people in user obj, add both

io.on('connection', (socket) => {
  // console.log('socket', socket);
  socket.on('join', async room => {
    console.log('joined', room);
    socket.join(socket.id);
    console.log(socket.id);
    // userObject[socket.id] = {};
  });
  // Listening for user to enter username and emitting it with an event
  socket.on('usernamePopulate', async (username) => {
    console.log('in usernamePopulate:', socket.id);
    // userArr.[socket.id] = username;
    userArr.push({username: username, socketId: socket.id, score: 0});
    console.log(username);
    io.to(socket.id).emit('chatName', username);


    if(userArr.length === 2) {
      // io.to(socket.id).emit('usernamePopulate', username);
      let usernameOne = userArr[0].username;
      let usernameTwo = userArr[1].username;

      let usernameArr = [usernameOne, usernameTwo];
      io.emit('usernamePopulate', usernameArr);

      console.log('USERARR IN INDEX:', usernameArr);
    } 
    
    // else {
    // }


    let results = await thisIsTheSchema.find().distinct('topic');
    io.to(socket.id).emit('database', results);
    // console.log(userObject);
  });
  socket.on('doneGettingCats', () => io.to(socket.id).emit('loadPage'));
  socket.on('getCategoryQuestions', async category => {
    let results = await thisIsTheSchema.find({topic: category});
    io.emit('getCategoryQuestions', results);
    // console.log(results);
  });
  socket.on('nextQuestion', questionsAndAnswers => {

    if (wrongAnsArr.length === 1){
      wrongAnsArr.pop();
    }

    userArr.forEach(user => {

      if(user.socketId === socket.id) {
        user.score++;
      }
    });

    io.emit('scoreIncrease', userArr);

    if(questionsAndAnswers.length > 0) {
      io.emit('getCategoryQuestions', questionsAndAnswers);
    } else {
      io.emit('gameEnd');
    }
  });



  socket.on('wrongAnsEvent', questionAndAnsPayload => {

    wrongAnsArr.push(questionAndAnsPayload);

    if(wrongAnsArr.length === 2){

      wrongAnsArr.pop();
      wrongAnsArr.pop();

      if(questionAndAnsPayload.length > 0) {
        io.emit('getCategoryQuestions', questionAndAnsPayload);
      } else {
        io.emit('gameEnd');
      }
    }
    
  });
  
  socket.on('afterEndRender', () => {
    let winner = 'tie game';
    if(userArr[0].score > userArr[1].score){
      winner = userArr[0].username;
    } else if (userArr[1].score > userArr[0].score) {
      winner = userArr[1].username;
    }
    io.emit('afterEndRender', winner) ;
  });


  // CHAT LISTENER

  socket.on('chatting', chatPayload => {
    console.log('chatting with friends!');
    io.emit('chatting', chatPayload);
  });



  socket.on('disconnect', () => {
    userArr = userArr.filter(user => user.socketId !== socket.id);
    console.log(`${socket.id} disconnected`);
    console.log(userArr);
  });

});


module.exports = io;

