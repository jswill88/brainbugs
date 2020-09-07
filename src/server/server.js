//Will be the express server

'use strict';

const express = require('express');
const app = express();

require('dotenv').config();


//TO DO
//error handlers
// const errorHandler = require('/')
// const notFoundHandler = require('/')
// app.use('*', notFoundHandler);
// app.use(errorHandler);
//

app.use(express.json());


module.exports = {
  server: app,
  start: port => {
    const PORT = port || process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
