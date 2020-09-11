'use strict';

let client = require('socket.io-client');
const chatClient = require('../chat-client.js');
const screen = require('../chat-screen.js');

let socket = client.connect();


let spy;
beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation();
});
afterEach(()=> {
  screen.chatScreen.destroy();
  spy.mockRestore();
});

it('should append the chat screen on a join event', () => {
  screen.chatScreen.append = jest.fn();
  socket.emit('join');
  expect(screen.chatScreen.append).toHaveBeenCalled();
});

it('should populate the username', () => {
  screen.chatScreen.render = jest.fn();
  socket.emit('chatting', {username: 'test'});
  expect(screen.chatScreen.render).toHaveBeenCalled();
});
