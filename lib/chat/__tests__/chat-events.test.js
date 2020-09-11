'use strict';

let client = require('socket.io-client');
const chatClient = require('../chat-client.js');
const chatScreen = require('../chat-screen.js');

let socket = client.connect();

it.skip('should emit chatting event at right time', () => {

});

