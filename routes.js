'use strict';

const express = require('express');
const User = require('./user');
const { passport, jwtOptions } = require('./passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', function(req, res, next) {
  res.send('OK');
});

router.post('/users', function(req, res, next) {
  if (req.body.email && req.body.username && req.body.password) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    User.find({ username: userData.username }, function(error, users) {
      if (!users.length) {
        User.create(userData, function (error, user) {
          if (error) {
            return next(error);
          } else {
            res.status(201).json({ body: 'test' });
          }
        });
      } else {
        const err = new Error('Username already exists.')
        err.status = 409;
        return next(err);
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
  let { username, password } = req.body;
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user || !user.validPassword(password, user.password)) {
      return next(null, false, { message: 'Incorrect username or password.' });
    }
    res.status(200).json({
      message: "ok",
      token: jwt.sign({ id: user._id }, jwtOptions.secretOrKey),
      email: user.email,
      id: user._id
    });
  });
});

router.get('/trips', authenticate, function(req, res, next) {
  res.status(200).json({ message: 'you\'ve made it' });
});

module.exports = router;
