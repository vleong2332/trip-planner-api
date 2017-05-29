'use strict';

const express = require('express');
const User = require('./user');

const router = express.Router();

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
