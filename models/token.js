const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  expireAt: {
    type: Date,
    required: true
  },
});

TokenSchema.pre('save', function(next) {
  const token = this;
  token.createdAt = new Date();
  token.expireAt = new Date(token.createdAt.getTime());
  token.expireAt.setDate(token.expireAt.getDate() + 1);
  next();
});

module.exports = mongoose.model('User', TokenSchema);;
