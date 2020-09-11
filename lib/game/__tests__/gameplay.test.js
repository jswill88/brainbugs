'use strict';

let client = require('socket.io-client');
const gameScreen = require('../gameplay-screen.js');

let socket = client.connect();

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation();
});
afterEach(()=> {
  // gameClient.process.exit(0);
  gameScreen.screen.destroy();
  spy.mockRestore();
});


it('should emit doneGettingCats event at right time', () => {
  const doneGetCatsHandler = jest.fn();
  socket.on('doneGettingCats', doneGetCatsHandler);
  socket.emit('database', ['thing1', 'thing2']);
  expect(doneGetCatsHandler).toHaveBeenCalled();
});


it.skip('should emit wrongAnsEvent event at right time', () => {
  //this event is triggered inside a Blessed event of on 'submit' (line 201 in gameplay-screen), how to get one level deeper to trigger? 
});

it.skip('should emit nextQuestion event at right time', () => {  
  // same issue as wrongAnsEvent
   
});

it.skip('should handle loadPage event at right time', () => {  
  // things being called inside handler are blessed-specific methods
   
});



it.skip('should handle afterEndRender event at right time', () => {

  // this event is listened to around line 289, unsure of how to test the things (Blessed methods) that are being called inside the handler 
  
  const setContent = jest.fn();  
  socket.emit('afterEndRender', 'winner');
  expect(setContent).toHaveBeenCalled();
});