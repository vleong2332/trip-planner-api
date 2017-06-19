'use strict';

const express = require('express');
const User = require('./user');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('OK');
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
          res.status(201).json({ body: user });
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

router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function(error, user) {
      if (error || !user) {
        const err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        res.end();
      }
    });
  } else {
    var err = new Error('Email and password are required.')
    err.status = 401;
    return next(err);
  }
});

router.get('/logout', function(req, res, next) {
  if (req.session) {
    console.log('Session exists')
    req.session.destroy(function(err) {
      if (err) {
        next(err)
      } else {
        res.status(200).end();
      }
    })
  }
});

module.exports = router;
