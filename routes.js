'use strict';

const express = require('express');
const User = require('./user');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('OK');
});

router.post('/login', function(req, res, next) {
  return res.send('Logged in!');
});

router.post('/users', function(req, res, next) {
  if (req.body.email &&
    req.body.username &&
    req.body.password) {
      const userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      };

      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          res.status = 201;
          res.json({ body: user });
        }
      });

      if (req.body.password !== req.body.confirmPassword) {
        const err = new Error('Passwords do not match.')
        err.status = 400;
        return next(err);
      }
    } else {
      const err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

module.exports = router;
