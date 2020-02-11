/**
 * Cryptolabz
 * 2020 - EPITECH PROJECT
 */
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const db = require('./models/index');
const Logger = require('./middleware/logger').Logger;
const coinbaseAPI = require('./services/scheduler/coinbase')


// Express Params 
var app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })),
app.use(cookieParser());

const config = {
  port: 3000,
  host: '0.0.0.0'
}

// Routes creation
var usersRouter = require('./routes/users');
var cryptosRouter = require('./routes/cryptos');
var articlesRouter = require('./routes/articles');

app.use('/users', usersRouter);
app.use('/cryptos', cryptosRouter);
app.use('/articles', articlesRouter);

// Default response
app.use(function(req, res, next) {
  Logger.log("EXPRESS : Unknown routes : "+req.originalUrl);
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
      "status" : false,
      "message": err.message,
      "error": err
  });
  Logger.log("EXPRESS : An error occured : " + err);
});

db.sequelize.sync({ force: true }).then(() => {
  app.listen(config.port, config.host, () => {
    console.log(`Cryptolabz server listening on port ${config.port}`);
    Logger.log("Cryptolabz Server started.");
  })
});

const coinbaseApi = new coinbaseAPI(60)
coinbaseApi.start();
module.exports = app;