//Connect mongo and start the server and the entry point for the app
'use strict';

const server = require('./src/server/server.js');

const mongoose = require('mongoose');
require('dotenv').config();

//TO DO
// const server = require('./src/server/server');
//

// const MONGODB_URI = 'mongodb://localhost:27017/auth-server-acl';

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// mongoose.connect(MONGODB_URI, mongooseOptions);

server.start(process.env.PORT);