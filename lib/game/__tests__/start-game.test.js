'use strict';

let client = require('socket.io-client');
const screen = require('../start.js');

let socket = client.connect();

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log').mockImplementation();
});
afterEach(()=> {
  screen.destroy();
  spy.mockRestore();
});

it('should properly handle the join event', () => {
  screen.append = jest.fn();
  socket.emit('join');
  expect(screen.append).toHaveBeenCalledTimes(2);
});
