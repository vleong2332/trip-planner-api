'use strict';

const express = require('express');

const userRouter = require('./users');
const tokenRouter = require('./tokens');

const router = express.Router();

router.use(function(req, res, next) {
  // This is probably where authentication would happen
  console.log('Main middleware');
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'OK' });
});

router.use('/users', userRouter);
router.use('/tokens', tokenRouter);

module.exports = router;
