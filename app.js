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

const app = express();

app.use(session({
  secret: 'shhh',
  resave: true,
  saveUninitialized: false
}));

console.log("FROM CONFIG       ", config.DBHost)
console.log("HARD-CODED STRING ", "mongodb://localhost:27017/trip-planner")

// parse incoming requests
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

// mongoose.connect("mongodb://localhost:27017/trip-planner");
mongoose.connect(config.DBHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = app;
