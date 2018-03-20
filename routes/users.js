var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var User = require('../models/user');

/* Register route */
router.post('/register', function(req, res, next){
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    /* function to add user */
    User.addUser(newUser, function(err, user){
        console.log(newUser);
       if(err){
           res.json({success: false, msg: 'Failed to reg'});
       }else{
           res.json({success: true, msg: "user registered"});
           console.log("anshul");
       }
    });
});

/* Authenticate */
router.post('/authenticate', function(req, res, next){
   var username = req.body.username;
   var password = req.body.password;

   User.getUserByUsername(username, (err, user) => {
       if(err) throw err;
       if(!user){
           return res.json({success: false, msg: 'User not found'});
       }
       User.comparePassword(password, user.password, (err, isMatch) => {
           if(err) throw err;
           if(isMatch){
               var token = jwt.sign(user.toJSON(), config.secret,{
                   expiresIn: 604800 //1week
               });
               res.json({
                   success: true,
                   token: 'JWT' + token,
                   user: {
                       id: user._id,
                       name: user.name,
                       username: user.username,
                       email: user.email
                   }
               });
           }else{
               return res.json({success: false, msg: 'wrong passsword'})
           }
       });
   });
});

/*Profile  */
router.get('/profile', function(req, res, next){
    res.send("PROFILklk");
});



module.exports = router;