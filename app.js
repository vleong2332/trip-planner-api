'use strict';

// if (process.env.NODE_ENV !== 'production') {
//     require('@glimpse/glimpse').init();
// }

const express = require('express');
const jsonParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const routes = require('./routes');
const config = require('config');
const passport = require('passport');
const User = require('./user');

const app = express();

mongoose.Promise = require('bluebird');

mongoose.connect(config.DBHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(passport.initialize());

app.use(jsonParser.json());
app.use(jsonParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    };
    next();
});

app.use('/trip-planner', routes);

module.exports = {
  app
};
