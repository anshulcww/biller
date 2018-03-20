var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var app = express();

//port number
var port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

//Start Server
app.get("/", function (req, res) {
    res.send("invalid");
});

//Index Route
app.listen(port, "0.0.0.0", function () {

    console.log('up and running ' + port);
});

