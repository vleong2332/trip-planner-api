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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

TokenSchema.pre('validate', function(next) {
  this.createdAt = new Date();
  this.expireAt = new Date(this.createdAt.getTime());
  this.expireAt.setDate(this.expireAt.getDate() + 1);
  next();
});

module.exports = mongoose.model('Token', TokenSchema);;
