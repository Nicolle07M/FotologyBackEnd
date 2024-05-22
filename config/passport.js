const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./key');
const Fotografo = require('../models/fotografo');

module.exports = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = Keys.secretOrKey;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Fotografo.findById(jwt_payload.id, (err, fotografo) => {
      if (err) {
        return done(err, false);
      }

      if (fotografo) {
        return done(null, fotografo);
      }

      return done(null, false);
    });
  }));
};
