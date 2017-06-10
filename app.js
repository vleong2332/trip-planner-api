'use strict';

// if (process.env.NODE_ENV !== 'production') {
//     require('@glimpse/glimpse').init();
// }

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE');
        return res.status(200).json({});
    };
    next();
});
app.use('/api', router);


module.exports = app;
