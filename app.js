'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('@glimpse/glimpse').init();
}

const express = require('express');
const jsonParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 8000;

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

app.listen(port, function() {
    console.log('Express server is listening on port', port)
});

app.use('/trip-planner', routes);

mongoose.connect('mongodb://localhost:27017/trip-planner');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
