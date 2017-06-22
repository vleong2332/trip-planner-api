const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;
