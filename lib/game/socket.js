'use strict';

require('dotenv').config();
const ioClient = require('socket.io-client');

module.exports = ioClient.connect(process.env.SERVER);