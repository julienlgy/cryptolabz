/**
 * Cryptolabz 2020
 * JL
 * last modified: 20/01/2020
 */

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const Logger = require('./log/logger.js').Logger;

// Express Params 
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

module.exports = app;