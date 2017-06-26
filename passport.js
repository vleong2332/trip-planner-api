const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const User = require('./user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'shhh'
};

const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
  User.findOne({ _id: jwtPayload.id }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: 'Incorrect username or password.' });
    }
    return next(null, user);
  });
});

passport.use(strategy);

module.exports = {
  passport,
  jwtOptions
};
