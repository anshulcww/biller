
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
   console.log(opts.jwtFromRequest)
    opts.secretOrKey = process.env.JWT_SECRET || config.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log("anshul");
    console.log(jwt_payload);
        User.findById(jwt_payload.data._id, function (err, user){
            console.log("payload")
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else{
                return done(null, false)
            }
        });
    }));
}