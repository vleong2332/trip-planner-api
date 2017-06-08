'use strict';

const express = require('express');
const User = require('./models/user');

const router = express.Router();

router.use(function(req, res, next) {
  // This is probably where authentication would happen
  console.log('This is the haps!');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'OK' });
});

router.route('/users/')
  .post(function(req, res, next) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (!email || !username || !password || !confirmPassword) {
      res.json({
        status: 400,
        message: 'All fields are required.'
      });
      return next();
    }

    if (password !== confirmPassword) {
      res.json({
        status: 400,
        message: 'Passwords do not match.'
      });
      return next();
    }

    let user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.save(function (error, user) {
      error ? res.send(error) : res.json({ message: 'User created!' });
    });
  })
  .get(function(req, res, next) {
    User.find(function(error, users) {
      error ? res.send(error) : res.json(users);
    });
  });

router.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(error, user) {
      error ? res.send(error) : res.json(user);
    });
  });

module.exports = router;
