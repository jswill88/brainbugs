require('dotenv').config();
const ioClient = require('socket.io-client');

module.exports = ioClient.connect(`http://localhost:${process.env.PORT}`);