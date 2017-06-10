'use strict';

const express = require('express');
const User = require('../models/user');

const userRouter = express.Router();

userRouter.use(function(req, res, next) {
  // This is probably where authentication would happen
  console.log('User middleware');
  next();
});

userRouter.route('/')

  .post(function(req, res, next) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    if (!email || !username || !password || !confirmPassword) {
      res.status(400);
      res.json({ message: 'All fields are required.' });
      return next();
    }

    if (password !== confirmPassword) {
      res.status(400);
      res.json({ message: 'Passwords do not match.' });
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

userRouter.route('/:user_id')

  .get(function(req, res) {
    User.findById(req.params.user_id, function(error, user) {
      if (error) {
        res.status(500);
        res.send(error);
      }
      res.json(user);
    });
  })

  .put(function(req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400);
      res.json({ message: 'No parameter found'});
      return;
    }

    for (let key in req.body) {
      if (key.toLowerCase() === 'password') {
        res.status(400);
        res.json({ message: 'Password cannot be changed.'});
        return;
      }
      if (!User.schema.obj.hasOwnProperty(key)) {
        res.status(400);
        res.json({ message: `Invalid parameter: ${key}.`});
        return;
      }
    }

    User.findById(req.params.user_id, function(error, user) {
      error && res.send(error);
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.save(function(error) {
        if (error) {
          res.status(500);
          res.send(error);
        }
        res.json({ message: 'User data is updated'});
      });
    });
  })

  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(error, user) {
      if (error) {
        res.status(500);
        res.send(error);
      }
      res.json({ message: 'User is deleted'});
    });
  });


module.exports = userRouter;
