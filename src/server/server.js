//Will be the express server

'use strict';

require('dotenv').config();
// const socketIO = require('socket.io');
// const INDEX = '/index.html';

const express = require('express');
const app = express();


// const io = app()
//   .use((req,res) => res.sendFile( INDEX, { root: __dirname } ))
//   .listen(PORT, () => console.log(`listening on ${PORT}`));

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');
const router = require('./router.js');

app.use(express.json());

app.use(router);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  app: app,
  // start: port => {
  //   const PORT = port || process.env.PORT || 3001;
  //   app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  // },
};
