const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {}; //opts - options
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // there are different ways to pass thetoken back and forth, here authorization in the header is used
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => { // this callback will give us the payload (user details)
    console.log(jwt_payload);
    User.getUserById(jwt_payload._id, (err, user) => { // This callback will return error or user
      
        //If there is an error
        if(err){
        return done(err, false);
      }
      // If user was returned and user is found
      if(user){
        return done(null, user);
      } else { //If user was returned and user is not found
        return done(null, false);
      }
    });
  }));
}