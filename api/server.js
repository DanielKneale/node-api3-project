const express = require('express');
const morgan = require("morgan"); // dev helper
const helmet = require("helmet");// protect your information

const usersRouter = require('./users/users-router.js');
const mw = require('../api/middleware/middleware.js')

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(mw.logger)

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
