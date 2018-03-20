var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database');
mongoose.connect(config.database);

/* to check whether we are connnected or not with db*/
mongoose.connection.on('connected', function (){
    console.log("connected to database" + config.database);
});
mongoose.connection.on('error', function (err){
    console.log("Database Error" + err);
});
var app = express();

var users = require('./routes/users.js')
//port number
var port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

/* passport middleware */
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use("/users", users);

//Start Server
app.get("/", function (req, res) {
    res.send("invalid");
});

//Index Route
app.listen(port, "0.0.0.0", function () {

    console.log('up and running ' + port);
});

