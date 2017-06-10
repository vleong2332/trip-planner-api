'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Token = require('../models/token');
const User = require('../models/user');

const tokenRouter = express.Router();

tokenRouter.use(function(req, res, next) {
  // This is probably where authentication would happen
  console.log('Token middleware');
  next();
});

tokenRouter.route('/')

  .get(function(req, res, next) {
    Token.find(function(error, tokens) {
      if (error) {
        res.status(500);
        res.send(error);
      }
      res.json(tokens);
    });
  })

  .post(function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
      res.status(400);
      res.json({ message: 'All fields are required'});
      return next();
    }

    User.findOne({username: username}, function(error, user) {

      if (error) {
        res.status(500);
        return next(error);
      }

      if (!user) {
        res.status(404);
        res.json({ message: 'Username and password do not match.'});
        return next();
      }

      bcrypt.compare(password, user.password, function(error, result) {

        if (error) {
          res.status(500);
          return next(error);
        }

        if (!result) {
          res.status(404);
          res.json({ message: 'Username and password do not match.'});
          return next();
        }

        crypto.randomBytes(32, function(error, buffer) {

          if (error) {
            res.status(500);
            return next(error);
          }

          let newToken = buffer.toString('hex');

          let token = new Token();
          token.token = newToken;
          token.user = mongoose.Types.ObjectId(user._id);
          token.save(function(error, newTokenString) {
            if (error) {
              res.status(500);
              res.send(error);
              return next();
            }
            res.json({ token: newToken });
          });
        });
      });
    });
    
  });

module.exports = tokenRouter;
