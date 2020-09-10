require('dotenv').config();
const ioClient = require('socket.io-client');

// module.exports = ioClient.connect(`https://brain-bugs.herokuapp.com/`);

module.exports = ioClient.connect(`http://localhost:3000`);