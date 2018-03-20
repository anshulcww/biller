var express = require('express');
var router = express.Router();

/* Register route */
router.get('/register', function(req, res, next){
    res.send("REGISTER");
});

/* Authenticate */
router.get('/authenticate', function(req, res, next){
    res.send("Authenticate");
});

/*Profile  */
router.get('/profile', function(req, res, next){
    res.send("PROFILE");
});

/*Validate  */
router.get('/validate', function(req, res, next){
    res.send("VALIDATE");
});

module.exports = router;