'use strict';

const ioClient = require('socket.io-client');

require('dotenv').config();

const chatSocket = ioClient.connect(`http://localhost:${process.env.PORT}`);

chatSocket.emit('join', 'chat room');