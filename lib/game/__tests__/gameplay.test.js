'use strict';

let client = require('socket.io-client');
const gameScreen = require('../gameplay-screen.js');

let socket = client.connect();

let spy;
beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation();
});
afterEach(()=> {
  gameScreen.screen.destroy();
  spy.mockRestore();
});

it('should emit doneGettingCats event at right time', () => {
  const doneGetCatsHandler = jest.fn();
  socket.on('doneGettingCats', doneGetCatsHandler);
  socket.emit('database', ['thing1', 'thing2']);
  expect(doneGetCatsHandler).toHaveBeenCalled();
});

it('should handle loadPage event at right time', () => {  
  gameScreen.screen.append = jest.fn();
  socket.emit('loadPage');
  expect(gameScreen.screen.append).toHaveBeenCalledTimes(3);
});

it('should remove the screen after afterEndRender event', () => {
  gameScreen.screen.remove = jest.fn();  
  socket.emit('afterEndRender', 'winner');
  expect(gameScreen.screen.remove).toHaveBeenCalled();
});

it('should append the end screen after the afterEndRender event ', () => {
  gameScreen.screen.append = jest.fn();
  gameScreen.screen.render = jest.fn();
  socket.emit('afterEndRender', 'winner');
  expect(gameScreen.screen.append).toHaveBeenCalled();
  expect(gameScreen.screen.render).toHaveBeenCalled();
});