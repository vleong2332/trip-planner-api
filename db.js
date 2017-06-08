const mongoose = require('mongoose');

const db = {
  init: function(dbUrl) {
    mongoose.connect(dbUrl);
    this.conn.on('error', console.error.bind(console, 'connection error:'))
  },
  conn: mongoose.connection
};

module.exports = db;
