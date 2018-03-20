var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config/database');

module.exports = function(passport){
    console.log("anshul");
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');;
   
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt_payload");
        User.getUserById(jwt_payload._doc._id, (err, user) =>{
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